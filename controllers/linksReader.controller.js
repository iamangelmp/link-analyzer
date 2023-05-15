const { search } = require("../routes/v1.js");
const getData = require("../services/axios.service.js");

const linksReader = async (req, res, next) => {
  const page_link = req.body.link;
  const search_param = req.body.search_param;
  const tag = await process_document(page_link, search_param);
  res.json({ page_link, tag });
};

async function process_document(url, search_param) {
  const document = await getData(url);
  const links = [];
  const regex = /<a\b[^>]*>(.*?)<\/a>/g; // Expresión regular para buscar etiquetas <a>
  const matches = document.match(regex); // Buscar las etiquetas <a> en el textos

  const dataObj = {
    mail: [],
    tel: [],
    links: { empty: [], matched: [], not_matched: [] },
  };

  matches.forEach((link) => {
    if (link.includes("mailto" || "email")) {
      dataObj.mail.push(link);
    }
    if (link.includes("tel:")) {
      dataObj.tel.push(link);
    }
    if (!link.includes("mailto" || "email") && !link.includes("tel:")) {
      if (!link.includes(search_param)) {
        dataObj.links.not_matched.push(link);
      } else if (link.includes("#")) {
        dataObj.links.empty.push(link);
      } else {
        dataObj.links.matched.push(link);
      }
    }
  });

  return dataObj;
}

module.exports = linksReader;
