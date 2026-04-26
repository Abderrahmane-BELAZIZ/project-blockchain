import { useState } from "react";
import web3 from "../web3";
import Ex8 from "../contracts/Ex8_Payment.json";

export default function Ex8Page() {
  const [montant, setMontant] = useState("");
  const [hashTx, setHashTx] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  const envoyer = async () => {
    if (!montant) return;
    setChargement(true);
    setErreur("");
    setHashTx(null);
    try {
      const comptes = await web3.eth.getAccounts();
      const reseauId = await web3.eth.net.getId();
      const contrat = new web3.eth.Contract(Ex8.abi, Ex8.networks[reseauId].address);
      const recu = await contrat.methods.receivePayment().send({
        from: comptes[0],
        value: web3.utils.toWei(montant, "ether"),
      });
      setHashTx(recu.transactionHash);
    } catch (e) {
      setErreur(e.message || "La transaction a échoué.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="ex-page">
      <div className="ex-page-header">
        <div className="ex-page-icon">💸</div>
        <div className="ex-page-meta">
          <span className="ex-page-tag">Exercice 08 · Payable</span>
          <h1 className="ex-page-title">Paiement en ETH</h1>
          <p className="ex-page-subtitle">Envoie des Ethers au contrat via la fonction <code className="mono">receivePayment()</code> déclarée payable.</p>
        </div>
      </div>

      <div className="panel">
        <p className="panel-title">Envoyer des Ethers</p>

        <div className="form-group">
          <label className="form-label" htmlFor="ex8-montant">Montant (ETH)</label>
          <input
            id="ex8-montant"
            className="form-input"
            type="number"
            step="0.001"
            placeholder="ex : 0.05"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && envoyer()}
          />
        </div>

        <div className="btn-row">
          <button
            id="ex8-envoyer-btn"
            className={`btn btn-primary ${chargement ? "loading" : ""}`}
            onClick={envoyer}
            disabled={chargement || !montant}
          >
            <span className="spinner" />
            <span className="btn-text">{chargement ? "Transaction en cours…" : "💸 Envoyer le paiement"}</span>
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

        {hashTx && !erreur && (
          <div className="result-box result-success">
            <div className="result-indicator" />
            <div className="result-content">
              <div className="result-label">Transaction confirmée ✓</div>
              <div className="result-value" style={{ fontSize: 11, opacity: 0.8, fontFamily: "JetBrains Mono, monospace", wordBreak: "break-all" }}>
                {hashTx}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                Paiement de <strong style={{ color: "var(--text-primary)" }}>{montant} ETH</strong> bien reçu par le contrat.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}