/**
 * Created by pengj on 2018-4-12.
 */
'use strict';
import {http} from './iotRequest';

export default class DictionaryService {
  static async optionsByDicTypeCode(dicTypeCode) {
    const result = await http.post('/api/ziot/tms/datadictionaryvalue/select-data-dictionary-value-group', { dicTypeCode })
    return result;
  }

  static async query(cond = {}) {
    const result = await  http.post('/api/ziot/tms/datadictionaryvalue/get-data-dictionary-value', cond);
    return result;
  }
}

// DictionaryService.optionsByDicTypeCode().then(console.log, console.log);