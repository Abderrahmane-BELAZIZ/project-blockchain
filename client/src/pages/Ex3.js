import { useState } from "react";
import web3 from "../web3";
import Ex3 from "../contracts/Ex3_GestionChaines.json";

export default function Ex3Page() {
  const [message, setMessage] = useState("");
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const enregistrer = async () => {
    if (!message) return;
    setChargement(true);
    setErreur("");
    try {
      const reseauId = await web3.eth.net.getId();
      const contrat = new web3.eth.Contract(Ex3.abi, Ex3.networks[reseauId].address);
      const comptes = await web3.eth.getAccounts();
      await contrat.methods.setMessage(message).send({ from: comptes[0] });
      const res = await contrat.methods.getMessage().call();
      setResultat(res);
    } catch (e) {
      setErreur(e.message || "La transaction a échoué.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">✏️</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 03 · Écriture + Lecture</span>
          <h1 className="ex-page-title">Stockage de chaîne</h1>
          <p className="ex-page-subtitle">Enregistre un message via <code className="mono">setMessage()</code>, puis le relit avec <code className="mono">getMessage()</code>.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Enregistrer un message</p>

        <div className="form-group">
          <label className="form-label" htmlFor="ex3-message">Votre message</label>
          <input
            id="ex3-message"
            className="form-input"
            type="text"
            placeholder="Écris ton message ici…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enregistrer()}
          />
        </div>

        <div className="btn-row">
          <button
            id="ex3-enregistrer-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={enregistrer}
            disabled={chargement || !message}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Envoi en cours…" : "📤 Enregistrer"}</span>
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

        {resultat !== null && !erreur && (
          <div className="result-box result-success">
            <div className="result-indicator" />
            <div className="result-content">
              <div className="result-label">Message stocké (on-chain)</div>
              <div className="result-value" style={{ fontFamily: "Inter, sans-serif" }}>« {resultat} »</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}