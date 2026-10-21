import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <section className="mx-auto max-w-2xl border border-white/10 bg-graphite p-8 text-center md:p-14">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
          Money Way Empire
        </p>

        <h1 className="mt-6 text-4xl font-black uppercase md:text-6xl">
          Pago <span className="text-gold">cancelado.</span>
        </h1>

        <p className="mt-8 text-lg text-zinc-300">
          Has salido de la pasarela de pago sin completar la compra.
        </p>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Si quieres consultar el estado de tu pedido, puedes hacerlo
          desde tu cuenta. No crees otro pedido sin comprobarlo antes.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/mi-cuenta"
            className="bg-gold px-7 py-4 text-sm font-black uppercase text-black"
          >
            Ver mis pedidos
          </Link>

          <Link
            href="/shop"
            className="border border-white/30 px-7 py-4 text-sm font-black uppercase text-white"
          >
            Volver a la tienda
          </Link>
        </div>
      </section>
    </main>
  );
}
