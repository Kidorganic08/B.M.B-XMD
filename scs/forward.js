const { adams } = require("../Ibrahim/adams");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bmbdatabase/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bmbdatabase/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
const cron = require("../bmbdatabase/cron");
const { exec } = require("child_process");

adams({ nomCom: "getallmembers", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) return repondre("✋🏿 This command is reserved for groups ❌");

  let mess = Array.isArray(arg) && arg.length ? arg.join(' ') : 'No message provided';
  let membresGroupe = verifGroupe && infosGroupe ? infosGroupe.participants || [] : [];

  let tag = `========================\n  
        🌟 *𝙱.𝙼.𝙱-𝚇𝙼𝙳 GROUP MEMBERS GIDS* 🌟
========================\n
> regards Ibrahimadams®\n\n`;

  const emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
  const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

  let mentions = [];
  membresGroupe.forEach((membre, index) => {
    let userJid = `${membre.id}`; // Ensure the full JID format
    tag += `${index + 1}. ${randomEmoji} ${userJid}\n`;
    mentions.push(userJid);
  });

  if (verifAdmin || superUser) {
    console.log("Sending message to:", dest);
    console.log("Message:", tag);
    console.log("Mentions:", mentions);

    zk.sendMessage(dest, { text: tag, mentions }, { quoted: ms })
      .then(() => console.log("Message sent successfully"))
      .catch(err => console.error("Error sending message:", err));
  } else {
    repondre("❌ Command reserved for admins.");
  }
});

// ========================= TAG ADMINS COMMAND ========================= //

adams({ nomCom: "tagadmin", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) return repondre("✋🏿 This command is reserved for groups ❌");

  let mess = Array.isArray(arg) && arg.length ? arg.join(' ') : 'No message provided';
  let membresGroupe = verifGroupe && infosGroupe ? infosGroupe.participants || [] : [];
  let adminsGroupe = membresGroupe.filter(membre => membre.isAdmin);

  let tag = `========================\n  
        🌟 *𝙱.𝙼.𝙱-𝚇𝙼𝙳* 🌟
========================\n
👥 Group : ${nomGroupe} 🚀 
👤 Author : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n\n`;

  const emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
  const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

  let mentions = [];
  adminsGroupe.forEach((admin, index) => {
    let userJid = `${admin.id}@s.whatsapp.net`; // Ensure the full JID format
    tag += `${index + 1}. ${randomEmoji} @${userJid}\n`;
    mentions.push(userJid);
  });

  if (verifAdmin || superUser) {
    console.log("Sending message to:", dest);
    console.log("Message:", tag);
    console.log("Mentions:", mentions);

    zk.sendMessage(dest, { text: tag, mentions }, { quoted: ms })
      .then(() => console.log("Message sent successfully"))
      .catch(err => console.error("Error sending message:", err));
  } else {
    repondre("❌ Command reserved for admins.");
  }
});
  
