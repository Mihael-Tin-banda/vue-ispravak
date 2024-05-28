<template>
<div class="bg-color">

<div class="flex md:flex-row flex-col justify-between items-center relative mb-4 mt-2">
    <a href="../../index.html" class="border-color border-2 p-2 border-dashed ml-2 hover:bg-red-500">Go back</a>

    <div class="flex flex-col md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <label for="ballCost" class="border-color border-2 p-2 border-dashed">Ulog po loptici:</label>
        <input type="number" id="ballCost" value="1" step="0.1" min="0.1" class="focus:outline-0 md:border-t-2 md:border-b-2 md:border-l-0 md:border-r-0 border-l-2 border-r-2 border-dashed text-color bg-color text-center">
        <button id="launchBall" class="border-color border-2 p-2 border-dashed hover:bg-red-500">Launch Balls</button>
    </div>

    <p id="coinDisplay" class="border-color border-2 p-2 border-dashed"></p>
</div>

<div id="gameContent" class="flex justify-center items-center"></div>
</div>
</template>

<script>
export default {
  name: 'PachinkoPage',
}
</script>

<style>
</style>