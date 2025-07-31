async function fetchCryptoData() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
  
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false'
    );
    
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    loading.style.display = "none";
    return data;
  } catch (error) {
    loading.textContent = `Error: ${error.message}. Retrying...`;
    console.error(error);
    setTimeout(fetchCryptoData, 3000);
    return [];
  }
}

function renderTable(data) {
  const tbody = document.getElementById("cryptoTableBody");
  tbody.innerHTML = "";

  data.forEach((coin) => {
    const row = document.createElement("tr");
    const changeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
    
    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td class="${changeClass}">${coin.price_change_percentage_24h?.toFixed(2) || '0.00'}%</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    const search = input.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const name = row.children[0].textContent.toLowerCase();
      const symbol = row.children[1].textContent.toLowerCase();
      row.style.display = name.includes(search) || symbol.includes(search) ? "" : "none";
    });
  });
}

function sortTableBy(index) {
  const tbody = document.getElementById("cryptoTableBody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const valA = a.children[index].textContent.replace(/[$,%]/g, "").replaceAll(',', '');
    const valB = b.children[index].textContent.replace(/[$,%]/g, "").replaceAll(',', '');
    return parseFloat(valB) - parseFloat(valA);
  });

  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}

function setupSorting() {
  document.getElementById("sortPrice").addEventListener("click", () => sortTableBy(2));
  document.getElementById("sortChange").addEventListener("click", () => sortTableBy(3));
  document.getElementById("sortMarketCap").addEventListener("click", () => sortTableBy(5));
}

(async () => {
  const data = await fetchCryptoData();
  if (data.length > 0) renderTable(data);
  setupSearch();
  setupSorting();
})();
