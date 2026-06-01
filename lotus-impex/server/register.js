const axios = require('axios');

async function register() {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      username: 'admin',
      password: 'password123'
    });
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

register();
