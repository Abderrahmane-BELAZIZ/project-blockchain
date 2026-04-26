import { useState } from "react";
import web3 from "../web3";
import Ex5 from "../contracts/Ex5_Parite.json";

export default function Ex5Page() {
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
      const contrat = new web3.eth.Contract(Ex5.abi, Ex5.networks[reseauId].address);
      const res = await contrat.methods.estPair(nombre).call();
      setResultat(res);
    } catch (e) {
      setErreur(e.message || "L'appel au contrat a échoué.");
    } finally {
      setChargement(false);
    }
  };

  const estPair = resultat === true;

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">⚖️</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 05 · Booléen</span>
          <h1 className="ex-page-title">Parité</h1>
          <p className="ex-page-subtitle">Appelle <code className="mono">estPair(n)</code> pour déterminer si un nombre est pair ou impair.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Saisie</p>

        <div className="form-group">
          <label className="form-label" htmlFor="ex5-nombre">Entier à tester</label>
          <input
            id="ex5-nombre"
            className="form-input"
            type="number"
            placeholder="ex : 4 ou 7"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verifier()}
          />
        </div>

        <div className="btn-row">
          <button
            id="ex5-verifier-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={verifier}
            disabled={chargement || nombre === ""}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Vérification…" : "⚖ Vérifier la parité"}</span>
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
              borderColor: estPair ? "rgba(34,211,238,0.35)" : "rgba(139,92,246,0.35)",
              background: estPair ? "rgba(34,211,238,0.05)" : "rgba(139,92,246,0.06)",
              marginTop: 20,
            }}
          >
            <div
              className="result-indicator"
              style={{
                background: estPair ? "var(--cyan)" : "var(--violet)",
                boxShadow: estPair ? "0 0 8px var(--cyan)" : "0 0 8px var(--violet)",
              }}
            />
            <div className="result-content">
              <div className="result-label">estPair({nombre})</div>
              <div className="result-value large" style={{ WebkitTextFillColor: estPair ? "var(--cyan)" : "var(--violet)" }}>
                {estPair ? "✓ Pair" : "✗ Impair"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}