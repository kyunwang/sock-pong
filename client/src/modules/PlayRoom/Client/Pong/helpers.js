// Based on: https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection

// TODO: Inverted conditional

export const collisionBoxSphere = (box, sphere, inverted = false) => {};

export const collisionBoxBox = (boxA, boxB, inverted = false) => {};

export const collisionSphereSphere = (sphereA, sphereB, inverted = false) => {
  const distance = Math.sqrt(
    (sphereA.position.x - sphereB.position.x) *
      (sphereA.position.x - sphereB.position.x) +
      (sphereA.position.y - sphereB.position.y) *
        (sphereA.position.y - sphereB.position.y) +
      (sphereA.position.z - sphereB.position.z) *
        (sphereA.position.z - sphereB.position.z)
  );

  if (inverted) {
    return (
      distance >
      Math.abs(
        sphereA.geometry.parameters.radius - sphereB.geometry.parameters.radius
      )
    );
  }

  return (
    distance <
    sphereA.geometry.parameters.radius + sphereB.geometry.parameters.radius
  );
};
