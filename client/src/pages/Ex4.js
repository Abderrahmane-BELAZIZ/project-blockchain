import { useState } from "react";
import web3 from "../web3";
import Ex4 from "../contracts/Ex4_Positif.json";

export default function Ex4Page() {
  const [nombre, setNombre] = useState("");
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const verifier = async () => {
    if (nombre === "") return;
    setChargement(true);
    setErreur("");
    try {
      const reseauId = await web3.eth.net.getId();
      const contrat = new web3.eth.Contract(Ex4.abi, Ex4.networks[reseauId].address);
      const res = await contrat.methods.estPositif(nombre).call();
      setResultat(res);
    } catch (e) {
      setErreur(e.message || "L'appel au contrat a échoué.");
    } finally {
      setChargement(false);
    }
  };

  const estPositif = resultat === true;

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">🔢</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 04 · Booléen</span>
          <h1 className="ex-page-title">Nombre positif</h1>
          <p className="ex-page-subtitle">Appelle <code className="mono">estPositif(n)</code> pour savoir si un nombre est positif.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Saisie</p>

        <div className="form-group">
          <label className="form-label" htmlFor="ex4-nombre">Entier à tester</label>
          <input
            id="ex4-nombre"
            className="form-input"
            type="number"
            placeholder="ex : -5 ou 42"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verifier()}
          />
        </div>

        <div className="btn-row">
          <button
            id="ex4-verifier-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={verifier}
            disabled={chargement || nombre === ""}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Vérification…" : "✔ Vérifier"}</span>
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
          <div
            className="result-box"
            style={{
              borderColor: estPositif ? "rgba(16,185,129,0.35)" : "rgba(244,63,94,0.35)",
              background: estPositif ? "rgba(16,185,129,0.06)" : "rgba(244,63,94,0.06)",
              marginTop: 20,
            }}
          >
            <div
              className="result-indicator"
              style={{
                background: estPositif ? "var(--emerald)" : "var(--rose)",
                boxShadow: estPositif ? "0 0 8px var(--emerald)" : "0 0 8px var(--rose)",
              }}
            />
            <div className="result-content">
              <div className="result-label">estPositif({nombre})</div>
              <div className="result-value large" style={{ WebkitTextFillColor: estPositif ? "var(--emerald)" : "var(--rose)" }}>
                {estPositif ? "✓ Positif" : "✗ Non positif"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}