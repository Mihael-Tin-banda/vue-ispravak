// services/googleFit.js
export async function getFitnessData() {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
  
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTimeMillis = startOfDay.getTime();
    const endTimeMillis = now.getTime();
  
    const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta',
          dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
        }],
        bucketByTime: { durationMillis: endTimeMillis - startTimeMillis },
        startTimeMillis,
        endTimeMillis,
      })
    });
  
    const data = await response.json();
    let steps = 0;
    if (data.bucket && data.bucket.length > 0) {
      const dataset = data.bucket[0].dataset[0];
      if (dataset.point && dataset.point.length > 0) {
        steps = dataset.point[0].value[0].intVal;
      }
    }
    return steps;
  }
  