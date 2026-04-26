import { useState } from "react";
import web3 from "../web3";
import Ex7 from "../contracts/Ex7_Rectangle.json";

export default function Ex7Page() {
  const [surface, setSurface] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const calculer = async () => {
    setChargement(true);
    setErreur("");
    try {
      const reseauId = await web3.eth.net.getId();
      const contrat = new web3.eth.Contract(Ex7.abi, Ex7.networks[reseauId].address);
      const res = await contrat.methods.surface().call();
      setSurface(res.toString());
    } catch (e) {
      setErreur(e.message || "L'appel au contrat a échoué.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">📐</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 07 · Struct</span>
          <h1 className="ex-page-title">Surface du rectangle</h1>
          <p className="ex-page-subtitle">Appelle <code className="mono">surface()</code> pour calculer l'aire d'un rectangle défini dans un struct Solidity.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Calcul de la surface</p>

        <div className="btn-row">
          <button
            id="ex7-calculer-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={calculer}
            disabled={chargement}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Calcul en cours…" : "📐 Calculer la surface"}</span>
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

        {surface !== null && !erreur && (
          <div className="result-box result-success">
            <div className="result-indicator" />
            <div className="result-content">
              <div className="result-label">Surface du rectangle (unités²)</div>
              <div className="result-value large">{surface} <span style={{ fontSize: 14, opacity: 0.6 }}>u²</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}