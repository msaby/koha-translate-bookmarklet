javascript:(
/*
Javascript bookmarlet to make the translation of koha easier from weblate : adds direct links to files in koha and koha manual git repo
version 1.0
currently works for english, french, german and italian versions of weblate interface
author : Mathieu Saby
source : https://github.com/msaby/koha-translate-bookmarklet/
*/
function()
{

  function _(str, locale) {
    let str_locale = {};
    str_locale ["link_to_git"] = {
      'en' : 'Links to files on the git repository',
      'en-GB' : 'Links to files on the git repository',
      'fr' : 'Liens vers les fichiers sur le dépot git',
      'de' : 'Links zu den Dateien auf dem Git-Repository',
      'it' : 'Link ai file del repository git'};
    str_locale ["source_string_location"] = {
      'en' : 'Source string location',
      'en-GB' : 'Source string location',
      'fr' : 'Emplacement de la chaîne source',
      'de' : 'Ort der Ausgangszeichenkette',
      'it' : 'Posizione stringa sorgente'};
    str_locale ["message1"] = {
      'en' : "Go to translate.koha-community.org before activating this bookmarklet!",
      'en-GB' : "Go to translate.koha-community.org before activating this bookmarklet!",
      'fr' : "Rendez vous sur translate.koha-community.org avant d'activer ce bookmarklet!",
      'de' : "Gehen Sie zu translate.koha-community.org, bevor Sie dieses Bookmarklet aktivieren!",
      'it' : "Vai su translate.koha-community.org prima di attivare questo bookmarklet!"};
    str_locale ["message2"] = {
      'en' : "Go to a 'koha' or 'koha-manual' project page before activating this bookmarklet!",
      'en-GB' : "Go to a 'koha' or 'koha-manual' project page before activating this bookmarklet!",
      'fr' : "Rendez-vous sur une page du projet 'koha' ou 'koha-manual' avant d'activer ce bookmarklet!",
      'de' : "Gehen Sie auf eine Seite des Projekts 'koha' oder 'koha-manual', bevor Sie dieses Bookmarklet aktivieren!",
      'it' : "Vai alla pagina di un progetto 'koha' o 'koha-manual' prima di attivare questo bookmarklet!"};
    str_locale ["message3"] = {
      'en' : "No source file identified!",
      'en-GB' : "No source file identified!",
      'fr' : "Pas de fichier source identifié!",
      'de' : "Keine Datei identifiziert!",
      'it' : "Nessun file identificato!"};
    return str_locale [str][locale] ;
  }
  const navigator_language = (navigator.language || navigator.userLanguage).substr(0, 2);
  if (window.location.hostname !== 'translate.koha-community.org') {
    alert(_("message1", navigator_language ));
    return;}
  const weblate_locale = (document.documentElement.lang);
  const koha_manual_git_repo = "https://gitlab.com/koha-community/koha-manual/-/blob/main/";
  const koha_git_repo = "https://git.koha-community.org/Koha-community/Koha/src/branch/";
  const regex_koha_version = /^koha\/([^\/]+)/i;
  const regex_koha_manual = /^koha-manual\//i;
  const koha_manual_match = document.title.match(regex_koha_manual);
  const koha_version_match = document.title.match(regex_koha_version);
  const is_koha_manual_project = (koha_manual_match !== null) ? true : false ;
  const is_koha_project = (koha_version_match !== null) ? true : false ;
  if (!(is_koha_project || is_koha_manual_project)) {
    alert (_("message2", weblate_locale));
    return;
  }
  const koha_version = (is_koha_manual_project || koha_version_match[1] == "main") ? "main" : koha_version_match[1] + ".x";
  const h5_source_string_description = [...document.querySelectorAll("div.panel.panel-default.string-info div.list-group-item > h5")].find(el => el.innerText === _("source_string_location", weblate_locale));
  if (!h5_source_string_description){
    alert(_("message3", weblate_locale));
    return;}
  const div_files = h5_source_string_description.parentNode;
  const files = [...div_files.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).filter (t => t.length > 0);
  if(files.length == 0){
    alert(_("message3", weblate_locale));
    return;}
  const files_path = is_koha_manual_project ? files.map (file => file.replace(/:([0-9]+)$/,'#L$1').replace(/^\.\.\/\.\.\//,'').replace(".rst",".rst?plain=1")) : files.map (file => file.replace (/\.yml:.+$/,'.yml').replace(/:([0-9]+)$/,'#L$1'));
  const git_urls = is_koha_manual_project ? files_path.map (file_path => koha_manual_git_repo+file_path) : files_path.map (file_path=> koha_git_repo+koha_version+"/"+file_path);
  let div_git_urls = document.createElement("div");
  div_git_urls.classList.add('list-group-item');
  div_git_urls.innerHTML = "<h5>"+_("link_to_git", weblate_locale)+"</h5>";
  git_urls.forEach (git_url => div_git_urls.innerHTML += "<a href="+git_url+" target='_blank'>"+git_url+"</a><br\>");
  div_files.after (div_git_urls);
})();
