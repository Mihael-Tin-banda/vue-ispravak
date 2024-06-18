<template>
  <div>
    <h1>Your Step Count: {{ steps }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardPage',
  data() {
    return {
      steps: 0,
    };
  },
  async created() {
    const token = this.$route.query.token;
    if (token) {
      try {
        const steps = await this.getFitnessData(token);
        this.steps = steps;
      } catch (error) {
        console.error("Failed to fetch the step count data", error);
      }
    } else {
      console.error("No token found in URL");
    }
  },
  methods: {
    async getFitnessData(accessToken) {
      try {
        const response = await axios.post(
          'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
          {
            aggregateBy: [
              {
                dataTypeName: 'com.google.step_count.delta',
              },
            ],
            bucketByTime: { durationMillis: 86400000 },
            startTimeMillis: Date.now() - 7 * 86400000,
            endTimeMillis: Date.now(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const stepCount = response.data.bucket.reduce((acc, bucket) => {
          const steps = bucket.dataset[0]?.point[0]?.value[0]?.intVal || 0;
          return acc + steps;
        }, 0);
        return stepCount;
      } catch (error) {
        console.error('Failed to fetch the step count data', error);
        throw new Error('Failed to fetch the step count data');
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
