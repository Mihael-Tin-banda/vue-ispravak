<template>
  <div></div>
    <div class="flex md:flex-row flex-col justify-between items-center relative mb-4 mt-2">
      <router-link to="/" 
      class="border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500">Go back</router-link>
      <div class="flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <label for="ballCost" class="border-color border-2 p-2 border-dashed">Ulog po loptici:</label>
        <input type="number" v-model.number="ballCost" id="ballCost" value="1" step="0.1" min="0.1" class="focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center">
        <button @click="onLaunchClick" @mousedown="onLaunchMouseDown" @mouseup="onLaunchMouseUp" @mouseleave="onLaunchMouseUp" id="launchBall" class="border-color border-2 p-2 border-dashed hover:bg-red-500">Launch Balls</button>
      </div>
      <p id="coinDisplay" class="border-color border-2 p-2 border-dashed">Coins: {{ coins }}</p>
    </div>
    <div id="gameContent" class="flex justify-center items-center"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Matter from 'matter-js';

export default {
  name: 'PachinkoPage',
  setup() {
    const store = useStore();
    const coins = ref(store.state.coins);
    const updateUserCoins = () => {
      coins.value = parseFloat(parseFloat(coins.value).toFixed(2));
      store.commit('updateCoins', coins.value);
    };
    const ballCost = ref(1);
    const launcher = ref(null);
    let engine, render, runner, launchInterval;
    const balls = [];
    const sections = [];
    const pins = [];

    const initializeMatter = () => {
      const gameContent = document.getElementById('gameContent');

      engine = Matter.Engine.create({
        gravity: { x: 0, y: 1 },
      });

      render = Matter.Render.create({
        element: gameContent,
        engine: engine,
        options: {
          width: 800,
          height: 600,
          wireframes: false,
          background: '#18181d',
        },
      });

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const wallOptions = { isStatic: true,
                            restitution: 0.8,
                            render: { fillStyle: '#fff' }
                          };

      const wallTop = Matter.Bodies.rectangle(render.canvas.width / 2, 0, render.canvas.width, 5, wallOptions);
      const wallBottom = Matter.Bodies.rectangle(render.canvas.width / 2, render.canvas.height, render.canvas.width, 5, wallOptions);
      const wallLeft = Matter.Bodies.rectangle(0, render.canvas.height / 2, 5, render.canvas.height, wallOptions);
      const wallRight = Matter.Bodies.rectangle(render.canvas.width, render.canvas.height / 2, 5, render.canvas.height, wallOptions);

      Matter.World.add(engine.world, [wallTop, wallBottom, wallLeft, wallRight]);

      const vertices = [
        { x: (render.canvas.width / 2) - 25, y: 95 },
        { x: render.canvas.width / 2, y: 85 },
        { x: (render.canvas.width / 2) + 25, y: 95 }
      ];

      launcher.value = Matter.Bodies.fromVertices(render.canvas.width / 2, 50, vertices, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });

      Matter.World.add(engine.world, launcher.value);

      const pinRadius = 10;
      const spacing = 42;
      const rows = 11;
      const cols = 23;
      const startY = launcher.value.position.y + launcher.value.bounds.max.y + spacing * 0.2;

      for (let i = 0; i < rows; i++) {
        const startX = (render.canvas.width - cols * spacing) / 2 + (i % 2) * spacing / 2;

        for (let j = 0; j < cols; j++) {
          const x = startX + j * spacing;
          const y = startY + i * spacing;
          const pin = Matter.Bodies.circle(x, y, pinRadius, {
            isStatic: true,
            restitution: 0.4, //Za bounce
            render: {
              fillStyle: 'transparent',
              strokeStyle: '#f7fff7',
              lineWidth: 4,
            },
          });
          pins.push(pin);
          Matter.World.add(engine.world, pin);
        }
      }

      const lastPin = pins.pop();
      Matter.World.remove(engine.world, lastPin);

      Matter.Events.on(engine, "afterUpdate", () => {
        for (let pin of pins) {
          Matter.Body.applyForce(pin, { x: 0, y: 0 }, { x: 0.05, y: 0 });
        }
      });

      const numSections = 9;
      const sectionWidth = render.canvas.width / numSections;
      const sectionHeight = 20;
      const borderThickness = 4;
      const sectionStartY = render.canvas.height - sectionHeight / 2;

      for (let i = 0; i < numSections; i++) {
        let coinsValue;
        if (i === Math.floor(numSections / 2)) {
          coinsValue = 0.4;
        } else if (i === Math.floor(numSections / 2) - 1 || i === Math.floor(numSections / 2) + 1) {
          coinsValue = 0.8;
        } else if (i === Math.floor(numSections / 2) - 2 || i === Math.floor(numSections / 2) + 2) {
          coinsValue = 1.4;
        } else if (i === Math.floor(numSections / 2) - 3 || i === Math.floor(numSections / 2) + 3) {
          coinsValue = 2.2;
        } else {
          coinsValue = 15;
        }
        const section = Matter.Bodies.rectangle(
          i * sectionWidth + sectionWidth / 2,
          sectionStartY,
          sectionWidth - borderThickness,
          sectionHeight,
          {
            isStatic: true,
            label: "section" + (i + 1) + " - multiplier: " + coinsValue,
            coins: coinsValue,
            render: { fillStyle: 'transparent' },
          }
        );
        sections.push(section);

        if (i > 0) {
          const leftBorder = Matter.Bodies.rectangle(
            i * sectionWidth - borderThickness / 2,
            sectionStartY,
            borderThickness,
            sectionHeight * 1.3,
            {
              isStatic: true,
              restitution: 1.0,
              label: 'border',
              render: { fillStyle: '#f55' },
            }
          );
          sections.push(leftBorder);
        }

        if (i < numSections - 1) {
          const rightBorder = Matter.Bodies.rectangle(
            (i + 1) * sectionWidth - borderThickness / 2,
            sectionStartY,
            borderThickness,
            sectionHeight * 1.3,
            {
              isStatic: true,
              restitution: 1.0,
              label: 'border',
              render: { fillStyle: '#f55' },
            }
          );
          sections.push(rightBorder);
        }
      }

      Matter.World.add(engine.world, sections);

      Matter.Events.on(engine, "collisionStart", (event) => {
        const pairs = event.pairs;
        for (const pair of pairs) {
          // Check if the collision is between a ball and a wall
          if ((pair.bodyA === wallLeft && balls.includes(pair.bodyB)) || (pair.bodyB === wallLeft && balls.includes(pair.bodyA))) {
            const ball = balls.includes(pair.bodyB) ? pair.bodyB : pair.bodyA;
            // Set the velocity of the ball to move it in the right direction
            Matter.Body.setVelocity(ball, { x: 2, y: ball.velocity.y });
          } else if ((pair.bodyA === wallRight && balls.includes(pair.bodyB)) || (pair.bodyB === wallRight && balls.includes(pair.bodyA))) {
            const ball = balls.includes(pair.bodyB) ? pair.bodyB : pair.bodyA;
            // Set the velocity of the ball to move it in the left direction
            Matter.Body.setVelocity(ball, { x: -2, y: ball.velocity.y });
          }

          // Existing collision detection logic
          for (let i = 0; i < balls.length; i++) {
            const ball = balls[i];
            if ((pair.bodyA === ball && sections.includes(pair.bodyB)) || (pair.bodyB === ball && sections.includes(pair.bodyA))) {
              const section = sections.includes(pair.bodyB) ? pair.bodyB : pair.bodyA;
              Matter.World.remove(engine.world, ball);
              balls.splice(i, 1);

              if (section.coins !== undefined) {
                coins.value += section.coins * ballCost.value;
                updateUserCoins();
              }
            }
          }
        }
      });

      Matter.Render.run(render);

      Matter.Events.on(render, 'afterRender', function() {
        render.context.font = '1rem Cutive Mono';
        render.context.fillStyle = 'white';
        render.context.textAlign = 'center';
        render.context.textBaseline = 'middle';
        sections.forEach(section => {
          if(section.coins !== undefined) {
            render.context.fillText(
              `${section.coins}`,
              section.position.x,
              section.position.y
            );
          }
        });
      });

      updateUserCoins();
    };

    const launchBall = () => {
      const ballsToLaunch = 1;
      for (let i = 0; i < ballsToLaunch; i++) {
        if (coins.value > ballCost.value) {
          coins.value -= ballCost.value;
          updateUserCoins();

          const variation = 100;
          const randomX = launcher.value.position.x - variation / 1.2 + Math.random() * variation;
          const newBall = Matter.Bodies.circle(
            randomX,
            launcher.value.position.y,
            10,
            {
              restitution: 0.6,
              friction: 0,
              render: { fillStyle: "#f55" },
            }
          );

          Matter.World.add(engine.world, newBall);
          balls.push(newBall);
          Matter.Body.applyForce(newBall, newBall.position, { x: 0, y: -0.005 });
        }
      }
    };

    const onLaunchClick = () => {
      const numBalls = ballCost.value;
      if (numBalls < 0) return;
      launchBall(numBalls);
    };

    const onLaunchMouseDown = () => {
      const numBalls = ballCost.value;
      if (numBalls < 0) return;
      launchInterval = setInterval(launchBall, 10);
    };

    const onLaunchMouseUp = () => {
      const numBalls = ballCost.value;
      if (numBalls < 0) return;
      clearInterval(launchInterval);
    };

    onMounted(() => {
      initializeMatter();
    });

    return {
      ballCost,
      coins,
      onLaunchClick,
      onLaunchMouseDown,
      onLaunchMouseUp,
    };
  },
  mounted() {
    document.body.classList.add('pachinko-page');
  },
  beforeUnmount() {
    document.body.classList.remove('pachinko-page');
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
