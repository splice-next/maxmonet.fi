const app = document.getElementById("app");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const themeToggle = document.getElementById("themeToggle");
const copyBtn = document.getElementById("copyOrg");
const copyStatus = document.getElementById("copyStatus");

const pages = {
  hem: `
    <section class="card">
      <h1>Om Maxmo-Net</h1>
      <p>
        Till Andelslaget Maxmo-Nets ändamål hör att främja medlemmarnas ekonomiska fördelar genom
        att anskaffa, äga, underhålla och driva ett konkurrensneutralt digitalt kommunikationsnät för
        anslutning av fastigheter, bestående av optisk fiber inklusive kanalisation och aktiv utrustning.
      </p>
      <p>
        Andelslaget kan köpa, förmedla och producera tjänster i kommunikationsnätet. Andelslaget låter i
        huvudsak olika tjänsteleverantörer, både kommersiella och ickekommersiella aktörer, distribuera
        tjänster i nätet.
      </p>
      <p>
        Styrelsen väljer tjänsteleverantörer enligt för detta ändamål särskilt uppgjorda villkor och avtal
        som styrelsen utarbetar. Andelslaget kan köpa, sälja, hyra eller inneha fastigheter, värdepapper eller
        annan egendom. Andelslaget kan även förvalta projekt som ansluter sig till skapandet och utvecklandet
        av detta fibernät.
      </p>
      <div class="actions">
        <iframe
          title="Maxmo-Net Facebook"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F118506991541287&tabs=timeline&width=500&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false"
          width="500"
          height="560"
          style="border:none;overflow:hidden;max-width:100%;border-radius:12px;"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      </div>
    </section>
  `,
  kontakt: `
    <section class="card">
      <h1>Kontakt</h1>
      <p>Vid frågor och felsituationer får du snabbast hjälp via vår <a href="https://chat.whatsapp.com/Lr0boNSWST8ETKr3K8bBlk">WhatsApp-community</a>.</p>
      <p>E-post: info at maxmonet.fi</p>
      <p>Andreas Knutar</p>
      <p>andreas.knutar at maxmonet.fi</p>
      <p>tel. 0500-363 679</p>
    </section>
  `,
  fiber: `
    <section class="card">
      <h1>Våra tjänster</h1>
      <p>
        Maxmo-Nets verksamhet består av att erbjuda tjänster för TV & Internet åt sina medlemmar.
        Andelslaget har ett eget fiberoptiskt nät inom områdena Maxmo kyrkoby, Tottesund, Ölis och delar av Kärklax.
      </p>
      <table>
        <thead>
          <tr><th>Tjänst</th><th>Pris (inkl. moms)</th></tr>
        </thead>
        <tbody>
          <tr><td>IT 100/100 mbit</td><td>24,30 euro/mån</td></tr>
          <tr><td>IT 250/250 mbit</td><td>27,40 euro/mån</td></tr>
          <tr><td>TV</td><td>16,20 euro/mån</td></tr>
        </tbody>
      </table>
       <p>
        Fibernätet är ett öppet fibernät. Andelslaget äger och upprätthåller nätets infrastruktur och ger
        tjänsteleverantörer möjlighet att distribuera tjänster på jämlika villkor. Medlemmarna kan välja
        vilka tjänster man tar del av.
      </p>
      <p>Fördelar med fibernät:</p>
      <ul>
        <li>Allt från en anslutning</li>
        <li>IP-TV med HD-kvalitet</li>
        <li>Höghastighets uppkoppling upp till 1 Gbit/s</li>
        <li>IP Telefoni</li>
        <li>Driftsäkert och mindre känsligt för åska än kopparnät</li>
      </ul>
      <p>
        Anslutningsavgiften är 1400 EUR (inkl. moms) per fastighet och förutsätter medlemskap i
        Andelslaget Maxmo-Net. Andelsavgiften är 50 EUR.
      </p>
    </section>
  `,
  kabelvisning: `
    <section class="card">
      <h1>Kabelvisning</h1>
      <p>
        Vi utför på begäran visning av fiberkabel innan grävarbeten inleds. Kabelvisning är kostnadsfri när den beställs minst 4 arbetsdagar innan grävningen påbörjas.
      </p>
      <p>
        Vid expressvisning (beställning samma dag eller de två följande dagarna), vid larm- och felsituationer bestäms kostnaderna för kabelvisningen från fall till fall enligt de faktiska kostnaderna.
      </p>
    </section>
  `
};

function routeFromHash() {
  const key = (location.hash || "#hem").replace("#", "").toLowerCase();
  return pages[key] ? key : "hem";
}

function render() {
  const route = routeFromHash();
  app.innerHTML = pages[route];
  document.querySelectorAll("#mobileNav a").forEach((link) => {
    const isActive = link.dataset.route === route;
    link.classList.toggle("active", isActive);
  });
  mobileNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

window.addEventListener("hashchange", render);

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  document.documentElement.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

copyBtn.addEventListener("click", async () => {
  const value = copyBtn.dataset.value;
  try {
    await navigator.clipboard.writeText(value);
    copyStatus.textContent = "Organisationsnummer kopierat.";
  } catch {
    copyStatus.textContent = `Kopiera manuellt: ${value}`;
  }
  setTimeout(() => {
    copyStatus.textContent = "";
  }, 2000);
});

render();
