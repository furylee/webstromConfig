import {DictionaryService,createInstance} from '@weiyang/web-common';

const http = createInstance({
  timeout: 5000
});

export async function fetchDicByName(params) {
  const res = await DictionaryService.optionsByDicTypeCode(params);
  return res;
}

export async function queryRegionList(parentRegionId) {
  const res = await http.post(`/api/ziot/tms/region/list`, { parentRegionId });
  return res;
}
