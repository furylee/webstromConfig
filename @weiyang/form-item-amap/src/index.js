import React from 'react';
import {Row, Col, Button, Input, Modal, Message,Switch} from 'antd';
import {Map, Marker, MouseTool, PolyEditor, Polygon} from 'react-amap';
import Geolocation from 'react-amap-plugin-geolocation';
import styles from './index.less';

const defaultKey = "5c7d3a7dd3595b94b5686070144ba540";


const toolButtonSize = 'default';

export default class MapSelect extends React.Component {
  constructor(props) {
    super(props);
    this.addressTextInput = React.createRef();
    let label = '未选择模式';
    if (props.value && props.value.type === 'Point') {
      label = '准备绘制坐标点';
    }
    else if (props.value && props.value.type === 'Polygon') {
      label = '准备绘制多边形';
    }
    this.state = {
      inputType:0,// 0 代表地址，1代表坐标
      lbs: {
        coordinates: [],
        type: 'null',
        properties: {}
      },
      pointInfo: {
        // 预设坐标点信息
        longitude: '118.778177',
        latitude: '31.8383',
      },
      polygonInfo: {
        // 预设多边形信息
        path: [],
        active: false,// 是否编辑模式
      },
      zoom: 15,
      label,
      visible: false,// 控制弹窗显示与隐藏
      ...this.convertInputs(props.value)
    };
    this.toolEvents = {
      created: (tool) => {
        this.tool = tool;
        this.openTool();
      },
      draw: ({obj}) => {
        this.drawWhat(obj);
      }
    };
    this.polygonEvents = {
      dblclick: () => {
        // 双击进行编辑
        this.setState({polygonInfo: {...this.state.polygonInfo, active: !this.state.polygonInfo.active}});
      }
    };
    this.mapPlugins = ['ToolBar'];
    this.pluginProps = {
      enableHighAccuracy: true,
      timeout: 10000,
      showButton: true
    };
    this.amapEvents = {
      created: (mapInstance) => {
        const {AMap} = window;
        this.mapInstance = mapInstance;
        AMap.service(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder'], () => {
          mapInstance.addControl(new AMap.ToolBar());

          mapInstance.addControl(new AMap.Scale());

          this.geocoder = new AMap.Geocoder({});

        })
      }
    };

  }

  openTool = () => {
    if (this.state.lbs.type === 'Point') {
      this.tool.marker();
    }
    else if (this.state.lbs.type === 'Polygon') {
      this.tool.polygon();
    }
  };

  convertInputs = (lbs) => {
    console.log(lbs);
    if (lbs) {
      const state = {lbs, zoom: lbs.properties.zoom};
      if (lbs.type === 'Point') {
        state.pointInfo = {longitude: lbs.coordinates[0], latitude: lbs.coordinates[1]}
      }
      else if (lbs.type === 'Polygon') {
        const paths = lbs.coordinates[0];
        state.polygonInfo = {active: false, path: paths.map((point) => ({longitude: point[0], latitude: point[1]}))};
      }
      return state;
    }
    else {
      return {};
    }
  };
  convertOutputs = () => {
    const {lbs, pointInfo, polygonInfo} = this.state;
    const outputs = {
      type: lbs.type,
      properties: {zoom: this.mapInstance.getZoom()}
    };
    if (lbs.type === 'Point') {
      const pointArr = [pointInfo.longitude, pointInfo.latitude];
      outputs.coordinates = pointArr;

    }
    else if (lbs.type === 'Polygon') {
      const polygonArr = polygonInfo.path.map((point) => {
        return [point.longitude, point.latitude]
      });
      polygonArr.push(polygonArr[0]);
      outputs.coordinates = [polygonArr];
    }
    return outputs;

  };


  componentWillReceiveProps(nextProps) {
    // 此处比较nextProps和this.props 提高性能 待实现
    if ('value' in nextProps) {
      const {value} = nextProps;
      if (value) {
        this.setState({...this.convertInputs(value)});
      }
    }
  }

  triggerChange = (changedValue) => {
    // 反馈表单项数据
    const {onChange} = this.props;
    if (onChange) {
      onChange({...changedValue});
    }
  };

  onSearch = () => {
    const address = this.addressTextInput.current.input.value;
    if (address !== '') {
      if(this.state.inputType===0) {
        this.geocoder.getLocation(address, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            const {location} = result.geocodes[0];
            this.setState({
              lbs: {...this.state.lbs, type: 'Point'},
              pointInfo: {longitude: location.lng, latitude: location.lat}
            },()=>{
              this.onPointSelect();
            });
          } else {
            // 获取经纬度失败
            Message.error('获取经纬度失败，建议点击地图右上角自动定位或者直接地图取点的方式');
          }
        });
      }
      else{
        // 以逗号分隔坐标
        const lnglats=address.split(',');
        if(lnglats.length===2)
        {
          this.setState({
            lbs: {...this.state.lbs, type: 'Point'},
            pointInfo: {longitude: lnglats[0], latitude: lnglats[1]}
          },()=>{
            this.onPointSelect();
          });
        }
        else{
          Message.error('坐标值请以单个半角逗号分隔');
        }
      }

    }
    else {
      Message.warn('请输入详细地址信息或者坐标');
    }
  };

  openModalView = () => {
    this.setState({visible: true});

  };

  handleOk = () => {
    // 转储信息，输出到表单外部
    this.triggerChange(this.convertOutputs());
    this.setState({visible: false});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };


  disabledPolygonTool = () => {
    this.setState({polygonInfo: {...this.state.polygonInfo, active: false}});
  };


  onPointSelect = () => {
    if (this.tool) {
      this.tool.marker();
      this.setState({
        lbs: {...this.state.lbs, type: 'Point'},
        label: '准备绘制坐标点',
        polygonInfo: {...this.state.polygonInfo, active: false}
      });
    }
  };

  onPolygonSelect = () => {
    if (this.tool) {
      this.tool.polygon();
      this.setState({
        lbs: {...this.state.lbs, type: 'Polygon'},
        label: '准备绘制多边形',
        polygonInfo: {...this.state.polygonInfo, active: false}
      });
    }
  };

  drawWhat = (obj) => {
    let text = '';
    obj.hide();
    switch (obj.CLASS_NAME) {
      case 'AMap.Marker':
        text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
        // 获取点信息，并隐藏掉组件绘制的覆盖物
        const point = obj.getPosition();
        this.setState({
          label: text,
          pointInfo: {longitude: point.lng, latitude: point.lat}
        });

        break;
      case 'AMap.Polygon':
        const path = obj.getPath().map((pathPoint) => ({longitude: pathPoint.lng, latitude: pathPoint.lat}));
        text = `你绘制了一个多边形，有${path.length}个端点`;
        this.setState({
          label: text,
          polygonInfo: {...this.state.polygonInfo, path}
        });
        break;
      default:
        text = '';
    }
  };

  // 关闭鼠标工具
  close = () => {
    this.disabledPolygonTool();
    if (this.tool) {
      this.tool.close();
    }
    this.setState({
      lbs: {...this.state.lbs, type: 'null'},
      label: '未选择模式'
    });
  };

  //
  onInputTypeChange=(checked)=>{
    this.setState({inputType:checked?0:1});
  };


  render() {
    const {mapKey} = this.props;
    return (
      <div>
        <Row>
          <Button onClick={this.openModalView}>定位</Button>
          <Col span={24}>
            <Modal
              title="地图选择"
              visible={this.state.visible}
              width={800}
              destroyOnClose="true"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Row>
                <Col span={2} style={{height:32,lineHeight:'30px'}}>
                  <Switch checkedChildren="地址" unCheckedChildren="坐标" checked={this.state.inputType===0} onChange={this.onInputTypeChange} />
                </Col>
                <Col span={6}>
                  <Input ref={this.addressTextInput} />
                </Col>
                <Col span={2} />
                <Col span={6}>
                  <Button onClick={this.onSearch}>搜索</Button>
                </Col>
                <Col span={8} className={styles.buttonContainer}>
                  <Button
                    className="opButton"
                    type={this.state.lbs.type === 'Point' ? 'primary' : null}
                    size={toolButtonSize}
                    onClick={this.onPointSelect}
                  >选点
                  </Button>
                  <Button
                    className="opButton"
                    type={this.state.lbs.type === 'Polygon' ? 'primary' : null}
                    size={toolButtonSize}
                    onClick={this.onPolygonSelect}
                  >选区域
                  </Button>
                  <Button
                    className="opButton"
                    type={this.state.lbs.type === 'null' ? 'primary' : null}
                    size={toolButtonSize}
                    onClick={this.close}
                  >取消操作
                  </Button>
                </Col>
                <Col span={24}>
                  <div style={{width: '100%', height: 500, marginTop: 8}}>
                    <Map
                      plugins={this.mapPlugins}
                      amapkey={mapKey || defaultKey}
                      zoom={this.state.zoom}
                      center={this.state.pointInfo}
                      events={this.amapEvents}
                    >
                      <div className={styles.layerStyle}>{this.state.label}</div>
                      <MouseTool events={this.toolEvents} />
                      <Geolocation {...this.pluginProps} />
                      {
                        this.state.lbs.type === 'Point' ?
                          <Marker position={this.state.pointInfo} />
                          : null
                      }

                      {this.state.lbs.type === 'Polygon' ? (
                        <Polygon events={this.polygonEvents} path={this.state.polygonInfo.path}>
                          <PolyEditor active={this.state.polygonInfo.active} />
                        </Polygon>
                      ) : null
                      }
                    </Map>
                  </div>
                </Col>
              </Row>
            </Modal>
          </Col>
        </Row>
      </div>
    )
  }
}
