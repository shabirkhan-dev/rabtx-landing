import { Engineering } from "@/components/engineering";
import { EveryLayer } from "@/components/every-layer";
import { Footer } from "@/components/footer";
import { Hero, Nav } from "@/components/hero";
import { Products } from "@/components/products";

export default function Home() {
	return (
		<>
			<Nav />
			<main>
				<Hero />
				<EveryLayer />
				<Products />
				<Engineering />
			</main>
			<Footer />
		</>
	);
}
