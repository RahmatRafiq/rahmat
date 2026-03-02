require('dotenv').config({ path: '.env.local' });
const key = process.env.WAKATIME_API_KEY;

async function check() {
  const res = await fetch('https://api.wakatime.com/api/v1/users/current/summaries?range=last_7_days', {
    headers: { Authorization: `Basic ${Buffer.from(key).toString('base64')}` }
  });
  const data = await res.json();
  console.log(JSON.stringify({
    days: data.data?.slice(-7).map(d => ({ date: d.range.date, total_seconds: d.grand_total.total_seconds, text: d.grand_total.text }))
  }, null, 2));
}
check();
