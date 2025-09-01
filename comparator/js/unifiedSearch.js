// Unified search for networks (reseaux) and agencies
// Relies on reseauxList (from compareNetworks.js) and agenciesList (from compareAgencies.js)
// Uses existing global flags & calculate() from script.js
(function(){
  // --- Helpers ---
  function normalize(str){
    if(!str) return '';
    try { return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); } catch(e){ return (str+'').toLowerCase(); }
  }

  function buildCombinedList(){
    const networks = (window.reseauxList||[]).map(o=>({type:'network', name:o.name, commission:o.commission, forfait:o.prix_pack}));
    const agencies = (window.agenciesList||[]).map(o=>({type:'agency', name:o.name, commission:o.commission, forfait:0}));
    return [...networks, ...agencies];
  }

  function applySelection(item){
    if(!item) return;
    const hiddenNetwork = document.getElementById('reseauSearch');
    const hiddenAgency = document.getElementById('agencySearch');
    const commissionInput = document.getElementById('ar_commissions');
    const forfaitInput = document.getElementById('ar_forfait');

    if(item.type==='network'){
      hiddenNetwork && (hiddenNetwork.value = item.name);
      hiddenAgency && (hiddenAgency.value = '');
      window.isNetwork = true;
      commissionInput && (commissionInput.value = item.commission);
      forfaitInput && (forfaitInput.value = item.forfait);
      window.ar_commissions = item.commission;
      window.ar_forfait = item.forfait;
    } else { // agency
      hiddenAgency && (hiddenAgency.value = item.name);
      hiddenNetwork && (hiddenNetwork.value = '');
      window.isNetwork = false;
      commissionInput && (commissionInput.value = item.commission);
      forfaitInput && (forfaitInput.value = 0);
      window.ar_commissions = item.commission;
      window.ar_forfait = 0;
    }

    typeof updateNetworkCostText === 'function' && updateNetworkCostText();
    typeof calculate === 'function' && calculate();
  }

  function highlightLabel(full, query){
    const q = normalize(query.trim());
    if(!q) return full;
    const nFull = normalize(full);
    const idx = nFull.indexOf(q);
    if(idx<0) return full;
    const end = idx + q.length;
    return full.substring(0,idx) + '<strong>' + full.substring(idx,end) + '</strong>' + full.substring(end);
  }

  function createSuggestionItem(item, query){
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.setAttribute('data-name', item.name);
    div.setAttribute('data-type', item.type);
    div.innerHTML = `<span class="tag-type ${item.type==='network'?'net':'ag'}">${item.type==='network'?'Réseau':'Agence'}</span><span class="label-name">${highlightLabel(item.name, query)}</span><span class="meta">${item.commission}% • ${item.type==='network'? (item.forfait+'€ pack'): 'forfait 0€'}</span>`;
    div.addEventListener('click', ()=>{ applySelection(item); hideSuggestions(); entityInput.value = item.name; });
    return div;
  }

  let entityInput, suggestionsBox, combinedList = [], currentIndex = -1, lastQuery='';

  function ensureData(){
    if(!combinedList.length) combinedList = buildCombinedList();
  }

  function hideSuggestions(){
    if(!suggestionsBox) return;
    suggestionsBox.innerHTML='';
    suggestionsBox.style.display='none';
    currentIndex=-1;
  }

  function showSuggestions(items, query){
    if(!suggestionsBox) return;
    suggestionsBox.innerHTML='';
    if(!items.length){
      const empty = document.createElement('div');
      empty.className='suggestion-empty';
      empty.textContent='Aucun résultat';
      suggestionsBox.appendChild(empty);
      suggestionsBox.style.display='block';
      currentIndex=-1;
      return;
    }
    items.forEach((it,idx)=>{ const el=createSuggestionItem(it, query); el.dataset.index=String(idx); suggestionsBox.appendChild(el); });
    suggestionsBox.style.display='block';
    currentIndex=-1;
  }

  function filterList(query){
    const qNorm = normalize(query.trim());
    if(!qNorm) return []; // On affiche rien tant qu'il n'y a pas au moins 1 char
    return combinedList.filter(it=> normalize(it.name).includes(qNorm)).slice(0,8);
  }

  function moveSelection(delta){
    const items = suggestionsBox?.querySelectorAll('.suggestion-item');
    if(!items || !items.length) return;
    if(currentIndex>=0 && items[currentIndex]) items[currentIndex].classList.remove('selected');
    currentIndex += delta;
    if(currentIndex<0) currentIndex = items.length-1;
    if(currentIndex>=items.length) currentIndex=0;
    const el = items[currentIndex];
    if(el){ el.classList.add('selected'); el.scrollIntoView({block:'nearest'}); }
  }

  function selectCurrent(){
    const items = suggestionsBox?.querySelectorAll('.suggestion-item');
    if(!items || currentIndex<0 || currentIndex>=items.length) return;
    const el = items[currentIndex];
    const name = el.getAttribute('data-name');
    const type = el.getAttribute('data-type');
    const item = combinedList.find(i=> i.name===name && i.type===type);
    if(item){ applySelection(item); entityInput.value = item.name; hideSuggestions(); }
  }

  function handleKey(e){
    switch(e.key){
      case 'ArrowDown': e.preventDefault(); moveSelection(1); break;
      case 'ArrowUp': e.preventDefault(); moveSelection(-1); break;
      case 'Enter': if(suggestionsBox && suggestionsBox.style.display==='block'){ e.preventDefault(); selectCurrent(); } break;
      case 'Escape': hideSuggestions(); break;
      default: return;
    }
  }

  document.addEventListener('click', (ev)=>{ if(!ev.target.closest('.unified-search-container')) hideSuggestions(); });

  document.addEventListener('DOMContentLoaded', ()=>{
    entityInput = document.getElementById('entitySearch');
    suggestionsBox = document.getElementById('entitySuggestions');
    if(!entityInput || !suggestionsBox) return;
    ensureData();

    entityInput.addEventListener('focus', ()=>{ ensureData(); });

    entityInput.addEventListener('input', ()=>{
      const val = entityInput.value;
      if(val === lastQuery) return;
      lastQuery = val;
      ensureData();
      const results = filterList(val);
      showSuggestions(results, val);
    });

    entityInput.addEventListener('keydown', handleKey);
  });
})();
