import { useEffect, useState } from "react";
import web3 from "../web3";
import Ex1 from "../contracts/Ex1_Addition.json";

export default function Ex1Page() {
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    charger();
  }, []);

  const charger = async () => {
    setChargement(true);
    setErreur("");
    try {
      const reseauId = await web3.eth.net.getId();
      const deploye = Ex1.networks[reseauId];
      const contrat = new web3.eth.Contract(Ex1.abi, deploye.address);
      const res = await contrat.methods.addition1().call();
      setResultat(res.toString());
    } catch (e) {
      setErreur(e.message || "L'appel au contrat a échoué.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">➕</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 01 · Lecture</span>
          <h1 className="ex-page-title">Addition</h1>
          <p className="ex-page-subtitle">Appelle <code className="mono">addition1()</code> et retourne le résultat depuis la blockchain.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Interaction avec le contrat</p>

        <div className="btn-row">
          <button
            id="ex1-charger-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={charger}
            disabled={chargement}
          >
            <span className="spinner" />
            <span className="btn-text">⟳ {chargement ? "Chargement…" : "Appeler le contrat"}</span>
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
              <div className="result-label">Résultat de addition1()</div>
              <div className="result-value large">{resultat}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}