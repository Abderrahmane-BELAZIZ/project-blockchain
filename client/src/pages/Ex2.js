import { useState } from "react";
import web3 from "../web3";
import Ex2 from "../contracts/Ex2_Converter.json";

export default function Ex2Page() {
  const [ether, setEther] = useState("");
  const [wei, setWei] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const convertir = async () => {
    if (!ether) return;
    setChargement(true);
    setErreur("");
    try {
      const reseauId = await web3.eth.net.getId();
      const contrat = new web3.eth.Contract(Ex2.abi, Ex2.networks[reseauId].address);
      const res = await contrat.methods.etherEnWei(ether).call();
      setWei(res.toString());
    } catch (e) {
      setErreur(e.message || "L'appel au contrat a échoué.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">🔄</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 02 · Conversion</span>
          <h1 className="ex-page-title">Éther → Wei</h1>
          <p className="ex-page-subtitle">Appelle <code className="mono">etherEnWei(montant)</code> pour convertir une valeur en Éther vers Wei.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Saisie</p>

        <div className="form-group">
          <label className="form-label" htmlFor="ex2-ether">Montant en Éther</label>
          <input
            id="ex2-ether"
            className="form-input"
            type="number"
            placeholder="ex : 1.5"
            value={ether}
            onChange={(e) => setEther(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && convertir()}
          />
        </div>

        <div className="btn-row">
          <button
            id="ex2-convertir-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={convertir}
            disabled={chargement || !ether}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Conversion…" : "🔄 Convertir"}</span>
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

        {wei !== null && !erreur && (
          <div className="result-box result-info">
            <div className="result-indicator info" />
            <div className="result-content">
              <div className="result-label">{ether} ETH en Wei</div>
              <div className="result-value large">{wei} <span style={{ fontSize: 14, opacity: 0.6 }}>wei</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}