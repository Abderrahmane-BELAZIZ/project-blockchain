import { useState } from "react";
import web3 from "../web3";
import Ex6 from "../contracts/Ex6_Tableau.json";

export default function Ex6Page() {
  const [valeur, setValeur] = useState("");
  const [somme, setSomme] = useState(null);
  const [tableau, setTableau] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [chargementSomme, setChargementSomme] = useState(false);
  const [erreur, setErreur] = useState("");

  const getContrat = async () => {
    const comptes = await web3.eth.getAccounts();
    const reseauId = await web3.eth.net.getId();
    const contrat = new web3.eth.Contract(Ex6.abi, Ex6.networks[reseauId].address);
    return { contrat, comptes };
  };

  const ajouter = async () => {
    if (!valeur) return;
    setChargement(true);
    setErreur("");
    try {
      const { contrat, comptes } = await getContrat();
      await contrat.methods.ajouterNombre(valeur).send({ from: comptes[0] });
      const arr = await contrat.methods.afficheTableau().call();
      setTableau(arr.map((v) => v.toString()));
      setValeur("");
    } catch (e) {
      setErreur(e.message || "La transaction a échoué.");
    } finally {
      setChargement(false);
    }
  };

  const calculer = async () => {
    setChargementSomme(true);
    setErreur("");
    try {
      const { contrat } = await getContrat();
      const res = await contrat.methods.calculerSomme().call();
      setSomme(res.toString());
    } catch (e) {
      setErreur(e.message || "L'appel au contrat a échoué.");
    } finally {
      setChargementSomme(false);
    }
  };

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">📊</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 06 · Tableau</span>
          <h1 className="ex-page-title">Tableau dynamique</h1>
          <p className="ex-page-subtitle">Ajoute des nombres au tableau on-chain via <code className="mono">ajouterNombre()</code> et calcule leur somme avec <code className="mono">calculerSomme()</code>.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Ajouter un nombre</p>

        <div className="form-group">
          <label className="form-label" htmlFor="ex6-valeur">Nombre à ajouter</label>
          <input
            id="ex6-valeur"
            className="form-input"
            type="number"
            placeholder="ex : 42"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ajouter()}
          />
        </div>

        <div className="btn-row">
          <button
            id="ex6-ajouter-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={ajouter}
            disabled={chargement || !valeur}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Envoi…" : "＋ Ajouter"}</span>
          </button>
          <button
            id="ex6-somme-btn"
            className={`btn btn-secondary ${chargementSomme ? "loading" : ""}`}
            onClick={calculer}
            disabled={chargementSomme || tableau.length === 0}
          >
            <span className="spinner" />
            <span className="btn-text">{chargementSomme ? "Calcul…" : "Σ Calculer la somme"}</span>
          </button>
        </div>

        {erreur && (
          <div className="result-box" style={{ borderColor: "rgba(244,63,94,0.3)", background: "rgba(244,63,94,0.05)", marginTop: 20 }}>
            <div className="result-indicator" style={{ background: "var(--rose)", boxShadow: "0 0 8px var(--rose)" }} />
            <div className="result-content">
              <div className="result-label">Erreur</div>
              <div className="result-value" style={{ fontSize: 13 }}>{erreur}</div>
            </div>
          </div>
        )}

        {tableau.length > 0 && !erreur && (
          <div className="result-box result-info" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="result-indicator info" />
              <div className="result-content">
                <div className="result-label">Tableau on-chain ({tableau.length} élément{tableau.length > 1 ? "s" : ""})</div>
              </div>
            </div>
            <div className="tag-list">
              {tableau.map((v, i) => (
                <span key={i} className="tag">{v}</span>
              ))}
            </div>
          </div>
        )}

        {somme !== null && !erreur && (
          <div className="result-box result-success" style={{ marginTop: 12 }}>
            <div className="result-indicator" />
            <div className="result-content">
              <div className="result-label">Somme (calculerSomme)</div>
              <div className="result-value large">{somme}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}