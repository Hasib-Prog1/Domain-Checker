async function checkDomain() {
      const domain = document.getElementById("domainInput").value.trim();
      const resultElement = document.getElementById("result");

      if (!domain) {
        resultElement.innerText = " pls Enter your domini";
        return;
      }

      const url = `https://api.apilayer.com/whois/query?domain=${domain}`;
      const headers = {
        "apikey": "EK6OOcE4ybZLUo9ytom5kLXPIehjp9AY"
      };

      try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        console.log(data); 

        let createdDateStr = data?.result?.creation_date;

        createdDateStr = createdDateStr.replace(" ", "T"); 
        const createdDate = new Date(createdDateStr);

        if (isNaN(createdDate.getTime())) {
          resultElement.innerText = " Invalid date format";
          return;
        }

        const now = new Date();
        const diffTime = now - createdDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = (diffDays % 365) % 30;

        resultElement.innerText = ` ${domain}  age: ${years} years, ${months} months, ${days} day`;
      } catch (error) {
        console.error(error);
        resultElement.innerText = " Invalid format";
      }
    }

    document.getElementById("checkBtn").addEventListener("click", checkDomain);
  