import ImageModel from "./image-model";


const validateQuery= (fields:any): boolean => {  
 const properties:ImageModel={filename:'', height:0, width:0}
  const paramsKeys : string[] = Object.keys(properties);
  const modelParams : string[] = Object.keys(fields);
    return paramsKeys.every((item) =>modelParams.indexOf(item) !==-1);


}

export default validateQuery;