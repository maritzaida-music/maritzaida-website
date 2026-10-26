"use client";

import { useState, useCallback } from "react";

type Address = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

type Order = {
  id: string;
  paymentIntentId: string;
  created: number;
  customerName: string;
  email: string;
  product: string;
  amountTotal: number;
  shippingAddress: Address | null;
  shippingName: string;
  shipped: boolean;
  shippedAt: string | null;
  trackingNumber: string | null;
};

function formatAddress(addr: Address | null) {
  if (!addr) return "—";
  return [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code]
    .filter(Boolean)
    .join(", ");
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function AdminOrdersPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [shipping, setShipping] = useState<Record<string, "idle" | "loading" | "done" | "error">>({});

  const fetchOrders = useCallback(async (s: string) => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/orders", {
      headers: { "x-admin-secret": s },
    });
    setLoading(false);
    if (res.status === 401) { setError("Wrong password."); return; }
    if (!res.ok) { setError("Failed to load orders."); return; }
    const data = await res.json();
    setOrders(data.orders);
    setAuthed(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchOrders(secret);
  };

  const handleShip = async (order: Order) => {
    setShipping(p => ({ ...p, [order.id]: "loading" }));
    const res = await fetch("/api/admin/ship", {
      method: "POST",
      headers: {
        "x-admin-secret": secret,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: order.id,
        trackingNumber: tracking[order.id] || null,
      }),
    });
    if (res.ok) {
      setShipping(p => ({ ...p, [order.id]: "done" }));
      setOrders(prev => prev.map(o =>
        o.id === order.id
          ? { ...o, shipped: true, shippedAt: new Date().toISOString(), trackingNumber: tracking[order.id] || null }
          : o
      ));
    } else {
      const body = await res.json().catch(() => ({}));
      setShipping(p => ({ ...p, [order.id]: "error" }));
      alert(body.error || "Something went wrong.");
    }
  };

  const unshipped = orders.filter(o => !o.shipped);
  const shipped = orders.filter(o => o.shipped);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0b09" }}>
        <form onSubmit={handleLogin} style={{ width: 320, padding: "48px 40px", border: "1px solid #2a2520", background: "#120f0c" }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#c9a04a", fontFamily: "Arial, sans-serif" }}>Maritzaida Admin</p>
          <h1 style={{ margin: "0 0 24px", fontSize: 22, fontWeight: 400, color: "#f0e4c4", fontFamily: "Georgia, serif" }}>Orders</h1>
          <input
            type="password"
            placeholder="Password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", background: "#0d0b09", border: "1px solid #2a2520", color: "#e8dcc8", fontSize: 14, fontFamily: "Arial, sans-serif", boxSizing: "border-box", marginBottom: 12 }}
          />
          {error && <p style={{ margin: "0 0 12px", color: "#c0604a", fontSize: 13 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "10px 0", background: "#c9a04a", color: "#0d0b09", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontFamily: "Arial, sans-serif", opacity: loading ? .6 : 1 }}
          >
            {loading ? "Loading…" : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  const row = (order: Order) => {
    const status = shipping[order.id];
    return (
      <tr key={order.id} style={{ borderBottom: "1px solid #1e1a16" }}>
        <td style={td}>{formatDate(order.created)}</td>
        <td style={td}>
          <div style={{ color: "#f0e4c4" }}>{order.customerName || order.shippingName || "—"}</div>
          <div style={{ color: "#6a6058", fontSize: 12 }}>{order.email}</div>
        </td>
        <td style={td}>{order.product}</td>
        <td style={{ ...td, fontSize: 12 }}>{formatAddress(order.shippingAddress)}</td>
        <td style={td}>
          {order.shipped ? (
            <div>
              <span style={{ color: "#6aad7a", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase" }}>✓ Shipped</span>
              {order.shippedAt && <div style={{ color: "#6a6058", fontSize: 11 }}>{new Date(order.shippedAt).toLocaleDateString()}</div>}
              {order.trackingNumber && <div style={{ color: "#c9a04a", fontSize: 11 }}>{order.trackingNumber}</div>}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                placeholder="Tracking # (optional)"
                value={tracking[order.id] || ""}
                onChange={e => setTracking(p => ({ ...p, [order.id]: e.target.value }))}
                style={{ width: 160, padding: "6px 8px", background: "#0d0b09", border: "1px solid #2a2520", color: "#e8dcc8", fontSize: 12, fontFamily: "Arial, sans-serif" }}
              />
              <button
                onClick={() => handleShip(order)}
                disabled={status === "loading"}
                style={{ padding: "6px 14px", background: "#c9a04a", color: "#0d0b09", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontFamily: "Arial, sans-serif", whiteSpace: "nowrap", opacity: status === "loading" ? .6 : 1 }}
              >
                {status === "loading" ? "Sending…" : "Mark Shipped"}
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0b09", color: "#e8dcc8", fontFamily: "Arial, sans-serif", padding: "40px 32px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#c9a04a" }}>Maritzaida Admin</p>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 400, color: "#f0e4c4", fontFamily: "Georgia, serif" }}>Orders</h1>
        </div>
        <button
          onClick={() => fetchOrders(secret)}
          style={{ padding: "8px 16px", background: "transparent", border: "1px solid #2a2520", color: "#c9a04a", cursor: "pointer", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}
        >
          Refresh
        </button>
      </div>

      {unshipped.length > 0 && (
        <>
          <h2 style={{ margin: "0 0 12px", fontSize: 13, letterSpacing: ".15em", textTransform: "uppercase", color: "#c9a04a" }}>
            Needs Shipping ({unshipped.length})
          </h2>
          <div style={{ overflowX: "auto", marginBottom: 48 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2a2520" }}>
                  {["Date", "Customer", "Product", "Ship To", "Action"].map(h => (
                    <th key={h} style={{ ...td, textAlign: "left", color: "#6a6058", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", paddingBottom: 10 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{unshipped.map(row)}</tbody>
            </table>
          </div>
        </>
      )}

      {unshipped.length === 0 && (
        <p style={{ color: "#6aad7a", marginBottom: 48 }}>✓ All orders shipped.</p>
      )}

      {shipped.length > 0 && (
        <>
          <h2 style={{ margin: "0 0 12px", fontSize: 13, letterSpacing: ".15em", textTransform: "uppercase", color: "#6a6058" }}>
            Shipped ({shipped.length})
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, opacity: .7 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e1a16" }}>
                  {["Date", "Customer", "Product", "Ship To", "Status"].map(h => (
                    <th key={h} style={{ ...td, textAlign: "left", color: "#6a6058", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", paddingBottom: 10 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{shipped.map(row)}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

const td: React.CSSProperties = {
  padding: "14px 16px 14px 0",
  verticalAlign: "top",
  color: "#a09080",
};
