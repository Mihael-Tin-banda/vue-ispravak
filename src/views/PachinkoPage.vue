<template>
  <div class="bg-color px-4 py-2">
    <div class="flex flex-col md:flex-row justify-between items-center relative mb-4 mt-2 space-y-4 md:space-y-0 md:space-x-4">
      <router-link to="/" class="border-color border-2 p-2 border-dashed hover:bg-red-500">Go back</router-link>
      <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <label for="ballCost" class="border-color border-2 p-2 border-dashed">Ulog po loptici:</label>
        <input type="number" v-model.number="ballCost" id="ballCost" step="0.1" min="0.1" class="focus:outline-0 border-t-2 border-b-2 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center p-2">
        <button @click="onLaunchClick" @mousedown="onLaunchMouseDown" @mouseup="onLaunchMouseUp" @mouseleave="onLaunchMouseUp" id="launchBall" class="border-color border-2 p-2 border-dashed hover:bg-red-500">Launch Balls</button>
      </div>
      <p id="coinDisplay" class="border-color border-2 p-2 border-dashed">Coins: {{ coins }} KK</p>
    </div>
    <div id="gameContent" class="flex justify-center items-center game-content"></div>
  </div>
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

      const isTabletOrDesktop = window.innerWidth > 768;
      const gameWidth = isTabletOrDesktop ? 800 : 400;
      const gameHeight = isTabletOrDesktop ? 600 : 300;

      render = Matter.Render.create({
        element: gameContent,
        engine: engine,
        options: {
          width: gameWidth,
          height: gameHeight,
          wireframes: false,
          background: '#18181d',
        },
      });

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const wallOptions = {
        isStatic: true,
        restitution: 0.8,
        render: { fillStyle: '#fff' },
      };

      const wallTop = Matter.Bodies.rectangle(gameWidth / 2, 0, gameWidth, 5, wallOptions);
      const wallBottom = Matter.Bodies.rectangle(gameWidth / 2, gameHeight, gameWidth, 5, wallOptions);
      const wallLeft = Matter.Bodies.rectangle(0, gameHeight / 2, 5, gameHeight, wallOptions);
      const wallRight = Matter.Bodies.rectangle(gameWidth, gameHeight / 2, 5, gameHeight, wallOptions);

      Matter.World.add(engine.world, [wallTop, wallBottom, wallLeft, wallRight]);

      const vertices = [
        { x: (gameWidth / 2) - 12.5, y: 47.5 },
        { x: gameWidth / 2, y: 42.5 },
        { x: (gameWidth / 2) + 12.5, y: 47.5 }
      ];

      launcher.value = Matter.Bodies.fromVertices(gameWidth / 2, 25, vertices, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      });

      Matter.World.add(engine.world, launcher.value);

      const pinRadius = isTabletOrDesktop ? 10 : 5;
      const spacing = isTabletOrDesktop ? 42 : 21;
      const rows = 11;
      const cols = 23;
      const startY = launcher.value.position.y + launcher.value.bounds.max.y + spacing * 0.2;

      for (let i = 0; i < rows; i++) {
        const startX = (gameWidth - cols * spacing) / 2 + (i % 2) * spacing / 2;

        for (let j = 0; j < cols; j++) {
          const x = startX + j * spacing;
          const y = startY + i * spacing;
          const pin = Matter.Bodies.circle(x, y, pinRadius, {
            isStatic: true,
            restitution: 0.4,
            render: {
              fillStyle: 'transparent',
              strokeStyle: '#f7fff7',
              lineWidth: 2,
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
          Matter.Body.applyForce(pin, { x: 0, y: 0 }, { x: 0.025, y: 0 });
        }
      });

      const numSections = 9;
      const sectionWidth = gameWidth / numSections;
      const sectionHeight = isTabletOrDesktop ? 20 : 10;
      const borderThickness = 2;
      const sectionStartY = gameHeight - sectionHeight / 2;

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
          if ((pair.bodyA === wallLeft && balls.includes(pair.bodyB)) || (pair.bodyB === wallLeft && balls.includes(pair.bodyA))) {
            const ball = balls.includes(pair.bodyB) ? pair.bodyB : pair.bodyA;
            Matter.Body.setVelocity(ball, { x: 2, y: ball.velocity.y });
          } else if ((pair.bodyA === wallRight && balls.includes(pair.bodyB)) || (pair.bodyB === wallRight && balls.includes(pair.bodyA))) {
            const ball = balls.includes(pair.bodyB) ? pair.bodyB : pair.bodyA;
            Matter.Body.setVelocity(ball, { x: -2, y: ball.velocity.y });
          }

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
        render.context.font = isTabletOrDesktop ? '1rem Cutive Mono' : '0.5rem Cutive Mono';
        render.context.fillStyle = 'white';
        render.context.textAlign = 'center';
        render.context.textBaseline = 'middle';
        sections.forEach(section => {
          if (section.coins !== undefined) {
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

          const isTabletOrDesktop = window.innerWidth > 768;
          const ballRadius = isTabletOrDesktop ? 10 : 5;
          const variation = 100;
          const randomX = launcher.value.position.x - variation / 1.2 + Math.random() * variation;
          const newBall = Matter.Bodies.circle(
            randomX,
            launcher.value.position.y,
            ballRadius,
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
      launchInterval = setInterval(launchBall, 300);
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

@media (max-width: 767px) {
  #gameContent {
    width: 100%;
    height: auto;
    max-width: 400px;
    max-height: 300px;
  }

  .game-content canvas {
    width: 100% !important;
    height: auto !important;
  }
}
</style>
