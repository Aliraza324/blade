# TT Blade Pro — Premium 3D Table Tennis Blade Configurator

A production-grade, interactive 3D product configurator and ecommerce frontend experience for custom table tennis blades, designed to match professional sports equipment standards.

![TT Blade Pro Configurator](src/assets/Custom%20Table%20Tennis%20Blade%20Configurator.png)

---

## 1. Key Features

- **Interactive 3D Table Tennis Blade Viewer**:
  - Full 360° orbit rotation with smooth damping and touch navigation.
  - Realistic procedural table tennis paddle geometry with accurate competition silhouette.
  - Layered blade edges displaying authentic 3-ply, 5-ply, 7-ply, and carbon interleaving.
  - Ergonomic handle scales adapting to 4 handle profiles (Flared, Straight, Anatomic, Concave).
  - Metallic inlaid "TT Blade Pro" brand emblem on the handle butt.
  - Futuristic dark presentation podium with glowing red neon ring and dynamic studio lighting.
  - Multiple viewing angle presets: 45° Perspective, Front face, Back face, Edge/Side plies, and Handle close-up.
  - High-resolution browser-side PNG export.

- **Dynamic Customization System**:
  - **7 Exotic Tone-Woods**: Koto, Hinoki, Walnut, Zebrano, Limba, Ayous, Spruce with distinct procedural textures, density, speed, and acoustic ratings.
  - **4 Ergonomic Handle Types**: Flared (FL), Straight (ST), Anatomic (AN), Concave (CO).
  - **5 Blade Design Styles**: Classic, Carbon 2K Weave, Aerodynamic Wave, Minimal, and Custom Player Logo upload preview.
  - **6 Color Themes**: Natural Wood, Light Brown, Dark Walnut, Stealth Black, Crimson Red, Cobalt Blue.
  - **4 Blade Layer Configurations**: 3-Ply Pure Wood, 5-Ply Classic, 7-Ply Power, 5-Ply Carbon Composite.
  - **4 Surface Finishes**: Natural, Matte Satin, High Gloss Lacquer, and Nano-Shield Splinter Resistance.
  - Feature toggles for Wood Grain, 3D Layers, and Realistic Lighting.

- **Business Engines**:
  - **Dynamic Pricing Engine**: Centralized calculation for base price, material upcharges, handle fees, layer costs, and custom finishes.
  - **Physically Grounded Weight Calculator**: Calibrated using material volumetric density, handle geometry, and ply count, with realistic ±3g tolerance.
  - **Serial Code Generator**: Human-readable configuration IDs (e.g., `TTB-HIN-FLA-5P-9842`).

- **Full Ecommerce Journey**:
  - Persistent shopping cart supporting multiple distinct custom configurations in `localStorage`.
  - Promo discount code system (`PRO10` for 10% off, `CHAMPION20` for 20% off).
  - Simulated Checkout with comprehensive form validation, itemized breakdown, and confetti order confirmation.
  - Filterable & searchable Shop catalog with "Customize in 3D" preset loading.
  - Product Details page with performance radar metrics.
  - About and Contact pages with interactive FAQ and contact forms.

---

## 2. Technology Stack

- **Framework**: React 19 + Vite 8
- **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS v4, Custom Glassmorphism, Neon Glow CSS
- **State Management**: Zustand (Configurator store & Cart store with `localStorage` sync)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Celebration Effects**: Canvas Confetti

---

## 3. Project Architecture

```
src/
├── assets/                          # Static assets and reference design
├── components/
│   ├── cart/
│   │   └── CartDrawer.jsx           # Slide-out persistent shopping cart
│   ├── configurator/
│   │   ├── ColorSelector/           # Swatch color theme selector
│   │   ├── CustomizationPanel/      # Main left control panel with toggles
│   │   ├── DesignSelector/          # Surface graphics & custom logo uploader
│   │   ├── FinishSelector/          # Surface roughness & clearcoat selector
│   │   ├── HandleSelector/          # Ergonomic handle geometry selector
│   │   ├── LayerSelector/           # 3/5/7-ply & carbon ply selector
│   │   ├── MaterialSelector/        # 7 tone-wood species selector + modal
│   │   ├── ProductSummary/          # Right summary, dynamic price & weight
│   │   └── ProductViewer3D/         # Canvas, BladeModel, Podium & Lighting
│   └── layout/
│       ├── Header.jsx               # Sticky responsive navigation & cart count
│       └── Footer.jsx               # 4 value pillars, newsletter, links
├── data/
│   ├── colors.js                    # Color themes & tint multipliers
│   ├── designs.js                   # Classic, Carbon, Wave, Minimal, Bespoke
│   ├── finishes.js                  # Roughness, metalness, and clearcoat specs
│   ├── handles.js                   # Ergonomic handle definitions & weights
│   ├── layers.js                    # Ply counts, edge strata & thicknesses
│   ├── materials.js                 # 7 exotic woods, density & acoustic ratings
│   └── products.js                  # Featured catalog blade presets
├── pages/
│   ├── About/                       # Science & craftsmanship story
│   ├── Cart/                        # Full cart page with configuration inspection
│   ├── Checkout/                    # Simulated checkout & order confirmation
│   ├── Configurator/                # Main 3D product configurator workspace
│   ├── Contact/                     # Inquiries form & blade FAQ
│   ├── Home/                        # Landing page with hero & collections
│   ├── ProductDetails/              # Performance radar & specifications
│   └── Shop/                        # Filterable catalog with 3D studio launcher
├── routes/
│   └── AppRoutes.jsx                # Multi-page router configuration
├── store/
│   ├── cartStore.js                 # Cart state, quantities & promo codes
│   └── configuratorStore.js         # Active blade selections & 3D camera controls
└── utils/
    ├── configuration.js             # Configuration serial codes & WooCommerce schema
    ├── pricing.js                   # Formula-based price calculator
    ├── textureGenerator.js          # Procedural canvas wood grain & edge generator
    └── weightCalculator.js          # Volumetric density weight formula
```

---

## 4. Replacing Procedural Geometry with Fusion 360 CAD Assets

If original CAD assets exported from Autodesk Fusion 360 are provided:

1. **Export from Fusion 360**:
   - In Fusion 360, export the blade assembly as individual components or an unified scene:
     - `Blade_Head.glb` (Head with bevels)
     - `Blade_Edge.glb` (Edge perimeter)
     - `Handle_Flared.glb`, `Handle_Straight.glb`, `Handle_Anatomic.glb`, `Handle_Concave.glb`
     - `Handle_Emblem.glb`
   - Use Draco compression or Meshopt if file size exceeds 5MB.

2. **Place in Assets Directory**:
   - Put optimized `.glb` files into `public/models/blade/`.

3. **Swap in `BladeModel.jsx`**:
   - Replace `createPaddleHeadShape()` and `createHandleGeometry()` with `@react-three/drei`'s `useGLTF`:
     ```jsx
     import { useGLTF } from '@react-three/drei';

     export function BladeModel() {
       const { nodes, materials } = useGLTF('/models/blade/blade_assembly.glb');
       // Map faceMaterial to nodes.BladeHead.material
       // Map edgeMaterial to nodes.BladeEdge.material
       // Conditionally render handle meshes: nodes[`Handle_${handle.id}`]
     }
     ```
   - Keep the existing `faceMaterial`, `edgeMaterial`, and `handleMaterial` from `useMemo` so that texture, roughness, color tint, and finish adjustments continue to update the CAD meshes seamlessly.

---

## 5. WooCommerce Integration Schema

When connecting to WooCommerce via REST API or WordPress proxy, serialize the item using `toWooCommercePayload` from `src/utils/configuration.js`:

```json
{
  "product_id": "ttb-custom-blade",
  "name": "TT Blade Pro - Custom Blade",
  "quantity": 1,
  "subtotal": "73.00",
  "total": "73.00",
  "meta_data": [
    { "key": "_config_id", "value": "TTB-HIN-FLA-5P-9842" },
    { "key": "Wood Material", "value": "Hinoki" },
    { "key": "Handle Type", "value": "Flared" },
    { "key": "Design Style", "value": "Classic" },
    { "key": "Color Theme", "value": "Natural Wood" },
    { "key": "Blade Plies", "value": "5-Ply Classic All-Wood" },
    { "key": "Finish", "value": "Matte Satin" },
    { "key": "Estimated Weight", "value": "92g" },
    { "key": "Customization Charge", "value": "+$23.00" },
    { "key": "Custom Logo Attached", "value": false }
  ]
}
```

---

## 6. Installation & Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Quick Start
```bash
# Clone or navigate to repository
cd blade

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 7. License

Built for TT Blade Pro sports equipment engineering. All rights reserved.
