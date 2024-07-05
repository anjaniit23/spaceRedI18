export const SLIDER_OVERRIDES = {
  Thumb: {
    style: `h-8 w-8 spr-text-05`,
  },
  ThumbValue: {
    component: ({
      $value = [],
      $thumbIndex = 0,
    }: {
      $value?: number[];
      $thumbIndex?: number;
    }) => <>{$value[$thumbIndex]}</>,
  },
  InnerThumb: {
    component: () => null,
  },
};

export const getCheckboxOverrides = (
  lineThrough: boolean,
  underLine: boolean,
) => ({
  Root: {
    className: "pl-2 py-2",
  },
  Label: {
    className: [
      lineThrough ? "line-through" : "",
      underLine ? "underline" : "",
    ],
  },
});
