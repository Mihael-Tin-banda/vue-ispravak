import axios from 'axios';

export async function getFitnessData(accessToken) {
  const currentTime = Date.now();
  const startTime = new Date().setHours(0, 0, 0, 0); // Start of the current day

  try {
    const response = await axios.post(
      'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
      {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
          }
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: currentTime,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 401) {
      console.error('Access token is invalid or expired');
      return null;
    }
 
    const stepCount = response.data.bucket.reduce((acc, bucket) => {
      const steps = bucket.dataset[0]?.point[0]?.value[0]?.intVal || 0;
      return acc + steps;
    }, 0);

    return stepCount;
  } catch (error) {
    console.error('Failed to fetch the step count data', error);
    return null;
  }
}
