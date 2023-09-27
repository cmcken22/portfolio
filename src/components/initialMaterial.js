const initialMaterial = {
  version: 1,
  properties: {
    name: "Monkey w/ freckles",
    lighting: "basic",
    color: "white",
    alpha: 1,
  },
  layers: [
    {
      constructor: "Depth",
      properties: {
        near: -0.06800000000000028,
        far: 5,
        origin: [0, 0, 3],
        colorA: "#ff4eb8",
        colorB: "#24dbf8",
        alpha: 1,
        name: "Depth",
        mode: "normal",
        visible: true,
        mapping: "vector",
      },
    },
    {
      constructor: "Depth",
      properties: {
        near: 1,
        far: 3,
        origin: [0, 0, -1.3670000000000089],
        colorA: "#ff7800",
        colorB: "black",
        alpha: 1,
        name: "Depth",
        mode: "screen",
        visible: true,
        mapping: "vector",
      },
    },
    {
      constructor: "Fresnel",
      properties: {
        color: "white",
        alpha: 1,
        bias: 0,
        intensity: 1,
        power: 1.9099999999999757,
        name: "Fresnel",
        mode: "softlight",
        visible: true,
      },
    },
    // {
    //   constructor: "Noise",
    //   properties: {
    //     colorA: "#3bffd0",
    //     colorB: "#4e4e4e",
    //     colorC: "#000000",
    //     colorD: "#000000",
    //     alpha: 1,
    //     scale: 50,
    //     name: "noise",
    //     mode: "lighten",
    //     visible: true,
    //     type: "perlin",
    //     mapping: "local",
    //   },
    // },
  ],
};

export default initialMaterial;
