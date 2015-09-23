import _ from "lodash";

export const fillModelFromSchema = function (model, schema) {
  _.forOwn(schema.attributes, (attr, key) => { attr.name = key;});

  _.extend( model,
    {
      attributes: schema.attributes,
      order: _.keys(schema.attributes),
      index: schema.index
    }
  );
}
