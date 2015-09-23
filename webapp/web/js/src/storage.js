import falcor from "falcor";
import _ from "lodash";

let $ref = falcor.Model.ref;
let $atom = falcor.Model.atom;

export const fillModelFromSchema = function (model, schema) {
  _.forOwn(schema.attributes, (attr, key) => { attr.name = key;});



  return model.set({
    paths: ['attributes'],
    jsonGraph: {
      attributes: schema.attribute,
      order: _.map(_.keys(schema.attributes), (v) => {return $ref(['attributes', v]);} ),
      index: $ref(['attributes', schema.index])
    }
  }
    // {path: 'attributes', value: schema.attributes},
    // {path: 'order'     , value: _.map(_.keys(schema.attributes), (v) => {return $ref(['attributes', v]);} )},
    // {path: 'index'     , value: [$ref(['attributes', schema.index])]}
  );
}
