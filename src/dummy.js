const axios = require('axios').default;

const start = () => {
  setInterval(() => {
    const send = async () => {
      let voltage = Math.random() * (20 - 12) + 12;
      let dust = Math.random() * (2 - 0) + 0;
      let current = Math.random() * (5 - 0) + 0;
      let light = Math.random() * (100 - 0) + 0;
      let temperature = Math.random() * (40 - 25) + 23;
      let humidity = Math.random() * (100 - 0) + 0;
      let watt = voltage * current;
      await axios
        .get(
          `http://93.188.165.82/anj/data/sofiri.opusunju@stu.cu.edu.ng/7f063fab-8e4f-4bb1-806f-3c95f1c0fa00?voltage=${voltage}&current=${current}&dust=${dust}&light=${light}&temperature=${temperature}&humidity=${humidity}&watt=${watt}`
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };
    send();
    console.log('Data sent');
  }, 1000 * 2 * 60);
};

start();
