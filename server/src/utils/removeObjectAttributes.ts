interface IRemoveObjectAttributesProps<Obj extends object, Attr extends keyof Obj> {
  object: Obj
  attributes: Attr[]
}

export const removeObjectAttributes = <Obj extends object>({
  object,
  attributes,
}: IRemoveObjectAttributesProps<Obj, keyof Obj>): Obj => {
  const objectWithoutAttributes = object

  for (const attribute of attributes) {
    delete objectWithoutAttributes[attribute]
  }

  return objectWithoutAttributes
}
