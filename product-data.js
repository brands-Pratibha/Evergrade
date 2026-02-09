// Product Data - Centralized product information
// This file contains all product data used by both products.html and product-detail.html

const PRODUCTS_DATA = [
    // Product 1: Grains - Basmati Rice
    {
        id: 1,
        name: "Basmati Rice (Premium Long Grain)",
        category: "grains",
        rating: 4.9,
        supplier: {
            name: "Punjab Agro Exports",
            location: "Punjab, India",
            experience: "12 years experience"
        },
        certifications: ["FSSAI", "ISO", "Organic"],
        moq: "10 MT",
        leadTime: "7-10 days",
        capacity: "500 MT/month",
        description: "Premium quality Basmati rice with extra-long grains, known for its distinct aroma and fluffy texture. Sourced directly from the fertile plains of Punjab, our rice meets the highest export quality standards.",
        specifications: {
            "Grain Length": "8.3mm+",
            "Moisture": "12% max",
            "Broken": "1% max",
            "Packaging": "25kg/50kg PP bags"
        }
    },
    // Product 2: Pulses - Toor Dal
    {
        id: 2,
        name: "Toor Dal (Split Pigeon Peas)",
        category: "pulses",
        rating: 4.8,
        supplier: {
            name: "Maharashtra Pulses Co.",
            location: "Maharashtra, India",
            experience: "15 years experience"
        },
        certifications: ["FSSAI", "APEDA"],
        moq: "5 MT",
        leadTime: "5-7 days",
        capacity: "300 MT/month",
        description: "High-quality split pigeon peas sourced from certified farms. Perfect for export markets with consistent quality and excellent cooking properties.",
        specifications: {
            "Purity": "98% min",
            "Moisture": "12% max",
            "Damaged": "2% max",
            "Packaging": "25kg/50kg bags"
        }
    },
    // Product 3: Textiles - Cotton Fabric
    {
        id: 3,
        name: "Organic Cotton Fabric",
        category: "textiles",
        rating: 4.9,
        supplier: {
            name: "Textile Exports Ltd",
            location: "Gujarat, India",
            experience: "20 years experience"
        },
        certifications: ["GOTS", "OEKO-TEX"],
        moq: "500 meters",
        leadTime: "10-15 days",
        capacity: "100,000 m/month",
        description: "Premium organic cotton fabric certified by GOTS and OEKO-TEX. Ideal for sustainable fashion brands and eco-conscious manufacturers.",
        specifications: {
            "Composition": "100% Organic Cotton",
            "Width": "58-60 inches",
            "Weight": "120-180 GSM",
            "Packaging": "Roll packing"
        }
    },
    // Product 4: Building - Cement
    {
        id: 4,
        name: "Portland Cement (OPC 53 Grade)",
        category: "building",
        rating: 4.7,
        supplier: {
            name: "BuildRight Materials",
            location: "Rajasthan, India",
            experience: "25 years experience"
        },
        certifications: ["BIS", "ISO 9001"],
        moq: "100 MT",
        leadTime: "3-5 days",
        capacity: "5000 MT/month",
        description: "High-strength OPC 53 grade cement suitable for all construction applications. Meets all BIS standards for quality and performance.",
        specifications: {
            "Grade": "OPC 53",
            "Fineness": "225 m²/kg min",
            "Setting Time": "30-600 minutes",
            "Packaging": "50kg bags"
        }
    },
    // Product 5: Toys - Wooden
    {
        id: 5,
        name: "Wooden Educational Toys Set",
        category: "toys",
        rating: 4.8,
        supplier: {
            name: "KidsCraft Toys India",
            location: "Karnataka, India",
            experience: "10 years experience"
        },
        certifications: ["ASTM", "EN71", "Eco-Friendly"],
        moq: "500 sets",
        leadTime: "15-20 days",
        capacity: "10,000 sets/month",
        description: "Handcrafted wooden educational toys made from sustainable materials. Designed to enhance cognitive development in children while being completely safe and eco-friendly.",
        specifications: {
            "Material": "Natural Wood",
            "Age Group": "3-8 years",
            "Finish": "Non-toxic paint",
            "Packaging": "Gift box"
        }
    },
    // Product 6: Grocery - Turmeric
    {
        id: 6,
        name: "Turmeric Powder (Export Quality)",
        category: "grocery",
        rating: 4.9,
        supplier: {
            name: "Spice World Exports",
            location: "Tamil Nadu, India",
            experience: "18 years experience"
        },
        certifications: ["Organic", "FSSAI", "USDA"],
        moq: "5 MT",
        leadTime: "5-7 days",
        capacity: "200 MT/month",
        description: "Premium export-quality turmeric powder with high curcumin content. Sourced from the best farms in Tamil Nadu, known for its vibrant color and medicinal properties.",
        specifications: {
            "Curcumin Content": "3-4%",
            "Moisture": "10% max",
            "Mesh Size": "60-80",
            "Packaging": "25kg bags"
        }
    },
    // Product 7: Textiles - Silk
    {
        id: 7,
        name: "Pure Silk Fabric (Mulberry)",
        category: "textiles",
        rating: 4.8,
        supplier: {
            name: "Bangalore Silk House",
            location: "Karnataka, India",
            experience: "30 years experience"
        },
        certifications: ["Handloom", "GI Tag"],
        moq: "200 meters",
        leadTime: "14-21 days",
        capacity: "10,000 m/month",
        description: "Authentic mulberry silk fabric from Bangalore, known for its lustrous finish and exceptional quality. Perfect for traditional wear and luxury fashion.",
        specifications: {
            "Type": "Mulberry Silk",
            "Momme": "19-22",
            "Width": "44-45 inches",
            "Packaging": "Roll packing"
        }
    },
    // Product 8: Building - Steel Bars
    {
        id: 8,
        name: "TMT Steel Bars (Fe 500D)",
        category: "building",
        rating: 4.6,
        supplier: {
            name: "SteelCore Industries",
            location: "Odisha, India",
            experience: "22 years experience"
        },
        certifications: ["BIS", "ISO"],
        moq: "50 MT",
        leadTime: "7-10 days",
        capacity: "2000 MT/month",
        description: "High-strength TMT steel bars conforming to Fe 500D grade. Excellent for construction projects requiring superior ductility and weldability.",
        specifications: {
            "Grade": "Fe 500D",
            "Diameter": "8mm-32mm",
            "Length": "12 meters",
            "Packaging": "Bundled"
        }
    },
    // Product 9: Pulses - Chana Dal
    {
        id: 9,
        name: "Chana Dal (Bengal Gram)",
        category: "pulses",
        rating: 4.7,
        supplier: {
            name: "Rajasthan Pulses Hub",
            location: "Rajasthan, India",
            experience: "14 years experience"
        },
        certifications: ["FSSAI", "Organic"],
        moq: "5 MT",
        leadTime: "5-7 days",
        capacity: "250 MT/month",
        description: "Premium quality chana dal with excellent taste and nutritional value. Sourced from organic farms in Rajasthan.",
        specifications: {
            "Purity": "97% min",
            "Moisture": "12% max",
            "Foreign Matter": "1% max",
            "Packaging": "25kg/50kg bags"
        }
    },
    // Product 10: Grains - Wheat
    {
        id: 10,
        name: "Whole Wheat Flour (Atta)",
        category: "grains",
        rating: 4.8,
        supplier: {
            name: "Golden Harvest Mills",
            location: "Madhya Pradesh, India",
            experience: "20 years experience"
        },
        certifications: ["FSSAI", "ISO"],
        moq: "10 MT",
        leadTime: "3-5 days",
        capacity: "1000 MT/month",
        description: "Stone-ground whole wheat flour made from premium quality wheat. Rich in fiber and nutrients, perfect for healthy cooking.",
        specifications: {
            "Type": "Whole Wheat",
            "Gluten": "10-12%",
            "Moisture": "12% max",
            "Packaging": "5kg/10kg/25kg bags"
        }
    },
    // Product 11: Grocery - Mustard Oil
    {
        id: 11,
        name: "Cold Pressed Mustard Oil",
        category: "grocery",
        rating: 4.7,
        supplier: {
            name: "Pure Oil Exports",
            location: "Rajasthan, India",
            experience: "16 years experience"
        },
        certifications: ["FSSAI", "Organic", "AGMARK"],
        moq: "5000 liters",
        leadTime: "7-10 days",
        capacity: "50,000 L/month",
        description: "Traditional cold-pressed mustard oil with rich aroma and authentic taste. Made using traditional wooden ghani method.",
        specifications: {
            "Extraction": "Cold Pressed",
            "Acid Value": "1.0 max",
            "Moisture": "0.25% max",
            "Packaging": "15L tin/200L drums"
        }
    },
    // Product 12: Toys - Plush
    {
        id: 12,
        name: "Plush Soft Toys Collection",
        category: "toys",
        rating: 4.6,
        supplier: {
            name: "FunTime Toys Pvt Ltd",
            location: "Delhi NCR, India",
            experience: "12 years experience"
        },
        certifications: ["EN71", "CPSC"],
        moq: "1000 pieces",
        leadTime: "20-25 days",
        capacity: "25,000 pcs/month",
        description: "Soft and cuddly plush toys made with high-quality materials. Safe for children of all ages with hypoallergenic filling.",
        specifications: {
            "Material": "Premium Plush",
            "Filling": "Polyester Fiber",
            "Size Range": "6-24 inches",
            "Packaging": "Polybag/Box"
        }
    },
    // Product 13: Building - Tiles
    {
        id: 13,
        name: "Ceramic Floor Tiles (Vitrified)",
        category: "building",
        rating: 4.5,
        supplier: {
            name: "Morbi Ceramics Limited",
            location: "Gujarat, India",
            experience: "18 years experience"
        },
        certifications: ["ISO", "CE"],
        moq: "5000 sq.ft",
        leadTime: "10-14 days",
        capacity: "100,000 sq.ft/month",
        description: "High-quality vitrified floor tiles with excellent finish and durability. Available in multiple designs and sizes.",
        specifications: {
            "Type": "Vitrified",
            "Size": "600x600mm / 800x800mm",
            "Thickness": "9-10mm",
            "Packaging": "Cartons"
        }
    },
    // Product 14: Grocery - Sugar
    {
        id: 14,
        name: "Refined White Sugar (ICUMSA 45)",
        category: "grocery",
        rating: 4.8,
        supplier: {
            name: "Sugar Mills Federation",
            location: "Uttar Pradesh, India",
            experience: "25 years experience"
        },
        certifications: ["FSSAI", "ISO"],
        moq: "25 MT",
        leadTime: "5-7 days",
        capacity: "5000 MT/month",
        description: "Premium refined white sugar with ICUMSA 45 for export markets. Crystal clear and pure, ideal for food processing.",
        specifications: {
            "ICUMSA": "45 max",
            "Polarization": "99.8% min",
            "Moisture": "0.04% max",
            "Packaging": "50kg bags"
        }
    },
    // Product 15: Textiles - Jute
    {
        id: 15,
        name: "Natural Jute Fabric (Burlap)",
        category: "textiles",
        rating: 4.6,
        supplier: {
            name: "Bengal Jute Works",
            location: "West Bengal, India",
            experience: "35 years experience"
        },
        certifications: ["Eco-Friendly", "GI Tag"],
        moq: "1000 meters",
        leadTime: "10-14 days",
        capacity: "50,000 m/month",
        description: "100% natural jute fabric, biodegradable and eco-friendly. Perfect for packaging, bags, and sustainable fashion.",
        specifications: {
            "Composition": "100% Jute",
            "Width": "40-48 inches",
            "Weight": "200-400 GSM",
            "Packaging": "Roll packing"
        }
    },
    // Product 16: Pulses - Moong Dal
    {
        id: 16,
        name: "Moong Dal (Yellow Split)",
        category: "pulses",
        rating: 4.7,
        supplier: {
            name: "Madhya Pradesh Pulses",
            location: "Madhya Pradesh, India",
            experience: "12 years experience"
        },
        certifications: ["FSSAI", "APEDA"],
        moq: "5 MT",
        leadTime: "5-7 days",
        capacity: "200 MT/month",
        description: "Premium quality yellow split moong dal with excellent taste and quick cooking properties.",
        specifications: {
            "Purity": "98% min",
            "Moisture": "12% max",
            "Broken": "2% max",
            "Packaging": "25kg/50kg bags"
        }
    },
    // Product 17: Building - Bricks
    {
        id: 17,
        name: "Red Clay Bricks (First Class)",
        category: "building",
        rating: 4.4,
        supplier: {
            name: "Bharat Brick Industries",
            location: "Uttar Pradesh, India",
            experience: "20 years experience"
        },
        certifications: ["BIS", "ISI"],
        moq: "50,000 pieces",
        leadTime: "3-5 days",
        capacity: "500,000 pcs/month",
        description: "First-class red clay bricks with uniform shape and color. High compressive strength suitable for all construction needs.",
        specifications: {
            "Size": "230x115x75mm",
            "Strength": "75 kg/cm²",
            "Water Absorption": "15% max",
            "Packaging": "Loose/Palletized"
        }
    },
    // Product 18: Toys - Building Blocks
    {
        id: 18,
        name: "Building Blocks Set (300 pcs)",
        category: "toys",
        rating: 4.7,
        supplier: {
            name: "Creative Toys Manufacturing",
            location: "Maharashtra, India",
            experience: "8 years experience"
        },
        certifications: ["ASTM", "EN71", "Non-Toxic"],
        moq: "500 sets",
        leadTime: "15-20 days",
        capacity: "15,000 sets/month",
        description: "Colorful building blocks set with 300 pieces. Encourages creativity and motor skill development in children.",
        specifications: {
            "Pieces": "300",
            "Material": "ABS Plastic",
            "Age Group": "3+ years",
            "Packaging": "Storage container"
        }
    },
    // Product 19: Grains - Maize
    {
        id: 19,
        name: "Yellow Maize (Corn)",
        category: "grains",
        rating: 4.5,
        supplier: {
            name: "Karnataka Agri Exports",
            location: "Karnataka, India",
            experience: "15 years experience"
        },
        certifications: ["FSSAI", "Non-GMO"],
        moq: "25 MT",
        leadTime: "7-10 days",
        capacity: "1000 MT/month",
        description: "High-quality yellow maize for food processing and animal feed. Non-GMO with excellent nutritional profile.",
        specifications: {
            "Moisture": "14% max",
            "Foreign Matter": "2% max",
            "Broken": "3% max",
            "Packaging": "50kg PP bags"
        }
    },
    // Product 20: Grocery - Tea
    {
        id: 20,
        name: "Assam CTC Tea (Premium)",
        category: "grocery",
        rating: 4.9,
        supplier: {
            name: "Assam Tea Gardens",
            location: "Assam, India",
            experience: "40 years experience"
        },
        certifications: ["FSSAI", "Organic", "Fair Trade"],
        moq: "1 MT",
        leadTime: "7-10 days",
        capacity: "100 MT/month",
        description: "Premium Assam CTC tea with strong malty flavor. Sourced from heritage tea estates in upper Assam.",
        specifications: {
            "Type": "CTC",
            "Grade": "BOP/BOPSM",
            "Moisture": "3% max",
            "Packaging": "Plywood chests"
        }
    },
    // Product 21: Textiles - Linen
    {
        id: 21,
        name: "Premium Linen Fabric",
        category: "textiles",
        rating: 4.8,
        supplier: {
            name: "South India Textile Mills",
            location: "Tamil Nadu, India",
            experience: "25 years experience"
        },
        certifications: ["OEKO-TEX", "ISO"],
        moq: "500 meters",
        leadTime: "14-18 days",
        capacity: "25,000 m/month",
        description: "High-quality linen fabric with natural texture and breathable properties. Ideal for summer wear and home textiles.",
        specifications: {
            "Composition": "100% Linen",
            "Width": "54-58 inches",
            "Weight": "150-200 GSM",
            "Packaging": "Roll packing"
        }
    },
    // Product 22: Building - Sand
    {
        id: 22,
        name: "M-Sand (Manufactured Sand)",
        category: "building",
        rating: 4.5,
        supplier: {
            name: "Quarry Solutions India",
            location: "Karnataka, India",
            experience: "10 years experience"
        },
        certifications: ["BIS", "ISO"],
        moq: "100 MT",
        leadTime: "2-3 days",
        capacity: "10,000 MT/month",
        description: "High-quality manufactured sand as river sand alternative. Consistent grading and free from impurities.",
        specifications: {
            "Zone": "Zone II",
            "Fineness Modulus": "2.5-3.0",
            "Silt Content": "2% max",
            "Packaging": "Loose/Jumbo bags"
        }
    },
    // Product 23: Pulses - Urad Dal
    {
        id: 23,
        name: "Urad Dal (Black Gram)",
        category: "pulses",
        rating: 4.6,
        supplier: {
            name: "Andhra Pulses Exports",
            location: "Andhra Pradesh, India",
            experience: "16 years experience"
        },
        certifications: ["FSSAI", "APEDA"],
        moq: "5 MT",
        leadTime: "5-7 days",
        capacity: "150 MT/month",
        description: "Premium quality urad dal perfect for traditional Indian dishes. Excellent protein content and taste.",
        specifications: {
            "Purity": "97% min",
            "Moisture": "12% max",
            "Damaged": "2% max",
            "Packaging": "25kg/50kg bags"
        }
    },
    // Product 24: Grocery - Jaggery
    {
        id: 24,
        name: "Organic Jaggery (Gur)",
        category: "grocery",
        rating: 4.7,
        supplier: {
            name: "Natural Sweeteners Co.",
            location: "Maharashtra, India",
            experience: "10 years experience"
        },
        certifications: ["Organic", "FSSAI"],
        moq: "5 MT",
        leadTime: "5-7 days",
        capacity: "200 MT/month",
        description: "Traditional organic jaggery made from pure sugarcane juice. Natural sweetener with health benefits.",
        specifications: {
            "Color": "Golden Brown",
            "Sucrose": "65-85%",
            "Moisture": "5% max",
            "Packaging": "25kg cartons"
        }
    },
    // Product 25: Steel - HR Coils
    {
        id: 25,
        name: "Hot Rolled Steel Coils (HR)",
        category: "steel",
        rating: 4.8,
        supplier: {
            name: "Tata Steel Trading",
            location: "Jamshedpur, India",
            experience: "50+ years experience"
        },
        certifications: ["BIS", "ISO 9001"],
        moq: "100 MT",
        leadTime: "7-14 days",
        capacity: "5000 MT/month",
        description: "Premium hot rolled steel coils for various industrial applications. Consistent quality from India's leading steel manufacturer.",
        specifications: {
            "Thickness": "2-12mm",
            "Width": "1000-1500mm",
            "Grade": "IS 2062",
            "Packaging": "Coils"
        }
    },
    // Product 26: Steel - CR Sheets
    {
        id: 26,
        name: "Cold Rolled Steel Sheets (CR)",
        category: "steel",
        rating: 4.7,
        supplier: {
            name: "JSW Steel Limited",
            location: "Karnataka, India",
            experience: "40 years experience"
        },
        certifications: ["BIS", "ISO"],
        moq: "50 MT",
        leadTime: "10-15 days",
        capacity: "3000 MT/month",
        description: "High-quality cold rolled steel sheets with excellent surface finish. Perfect for automotive and appliance industries.",
        specifications: {
            "Thickness": "0.5-3mm",
            "Width": "1000-1250mm",
            "Grade": "IS 513",
            "Packaging": "Sheets/Coils"
        }
    },
    // Product 27: Steel - Stainless
    {
        id: 27,
        name: "Stainless Steel 304 Grade",
        category: "steel",
        rating: 4.9,
        supplier: {
            name: "SAIL Stainless",
            location: "Maharashtra, India",
            experience: "35 years experience"
        },
        certifications: ["ASTM", "ISO", "BIS"],
        moq: "25 MT",
        leadTime: "14-21 days",
        capacity: "1000 MT/month",
        description: "Premium 304 grade stainless steel with excellent corrosion resistance. Suitable for food processing and chemical industries.",
        specifications: {
            "Grade": "304/304L",
            "Finish": "2B/BA/No.4",
            "Thickness": "0.3-6mm",
            "Packaging": "Coils/Sheets"
        }
    },
    // Product 28: Non Ferrous - Aluminum
    {
        id: 28,
        name: "Aluminum Sheets (1100 Grade)",
        category: "nonferrous",
        rating: 4.7,
        supplier: {
            name: "Hindalco Industries",
            location: "Maharashtra, India",
            experience: "60 years experience"
        },
        certifications: ["BIS", "ISO"],
        moq: "10 MT",
        leadTime: "7-10 days",
        capacity: "500 MT/month",
        description: "Pure aluminum sheets with excellent formability and corrosion resistance. Ideal for food packaging and construction.",
        specifications: {
            "Alloy": "1100",
            "Temper": "H14/H24",
            "Thickness": "0.5-3mm",
            "Packaging": "Palletized sheets"
        }
    },
    // Product 29: Non Ferrous - Copper Wire
    {
        id: 29,
        name: "Copper Winding Wire (Enameled)",
        category: "nonferrous",
        rating: 4.8,
        supplier: {
            name: "Apar Industries",
            location: "Gujarat, India",
            experience: "45 years experience"
        },
        certifications: ["ISI", "ISO"],
        moq: "5 MT",
        leadTime: "10-14 days",
        capacity: "200 MT/month",
        description: "High-quality enameled copper winding wire for electrical applications. Excellent conductivity and insulation properties.",
        specifications: {
            "Purity": "99.9%",
            "Size Range": "0.20-4.0mm",
            "Insulation": "Polyester/Polyimide",
            "Packaging": "Spools"
        }
    },
    // Product 30: Non Ferrous - Brass
    {
        id: 30,
        name: "Brass Rods & Profiles",
        category: "nonferrous",
        rating: 4.6,
        supplier: {
            name: "Jamnagar Brass",
            location: "Gujarat, India",
            experience: "30 years experience"
        },
        certifications: ["BIS", "ISO"],
        moq: "2 MT",
        leadTime: "7-10 days",
        capacity: "100 MT/month",
        description: "High-quality brass rods and profiles for various industrial applications. Excellent machinability and corrosion resistance.",
        specifications: {
            "Alloy": "CuZn37/CuZn39",
            "Diameter": "3-100mm",
            "Length": "3-6 meters",
            "Packaging": "Bundled"
        }
    },
    // Product 31: Polymers - HDPE
    {
        id: 31,
        name: "HDPE Granules (High Density)",
        category: "polymers",
        rating: 4.7,
        supplier: {
            name: "Reliance Polymers",
            location: "Gujarat, India",
            experience: "30 years experience"
        },
        certifications: ["ISO", "BIS"],
        moq: "20 MT",
        leadTime: "5-7 days",
        capacity: "1000 MT/month",
        description: "High-density polyethylene granules for blow molding and injection molding applications.",
        specifications: {
            "MFI": "0.3-12 g/10min",
            "Density": "0.95-0.96 g/cc",
            "Color": "Natural/Custom",
            "Packaging": "25kg bags"
        }
    },
    // Product 32: Polymers - PVC
    {
        id: 32,
        name: "PVC Resin (Suspension Grade)",
        category: "polymers",
        rating: 4.6,
        supplier: {
            name: "Chemplast Sanmar",
            location: "Tamil Nadu, India",
            experience: "35 years experience"
        },
        certifications: ["BIS", "ISO 9001"],
        moq: "25 MT",
        leadTime: "7-10 days",
        capacity: "2000 MT/month",
        description: "High-quality suspension grade PVC resin for pipes, profiles, and flexible applications.",
        specifications: {
            "K-Value": "57-70",
            "Bulk Density": "0.5-0.6 g/cc",
            "Moisture": "0.3% max",
            "Packaging": "25kg bags"
        }
    },
    // Product 33: Polymers - PP
    {
        id: 33,
        name: "Polypropylene (PP Granules)",
        category: "polymers",
        rating: 4.8,
        supplier: {
            name: "IOCL Petrochemicals",
            location: "Gujarat, India",
            experience: "40 years experience"
        },
        certifications: ["BIS", "ISO"],
        moq: "20 MT",
        leadTime: "5-7 days",
        capacity: "3000 MT/month",
        description: "Premium polypropylene granules for injection molding, raffia, and fiber applications.",
        specifications: {
            "MFI": "3-35 g/10min",
            "Density": "0.90 g/cc",
            "Color": "Natural",
            "Packaging": "25kg bags"
        }
    },
    // Product 34: Chemicals - Caustic Soda
    {
        id: 34,
        name: "Caustic Soda Flakes (NaOH)",
        category: "chemicals",
        rating: 4.7,
        supplier: {
            name: "Grasim Industries",
            location: "Gujarat, India",
            experience: "50 years experience"
        },
        certifications: ["ISO", "REACH"],
        moq: "20 MT",
        leadTime: "3-5 days",
        capacity: "5000 MT/month",
        description: "High-purity caustic soda flakes for various industrial applications including textiles, soaps, and chemical processing.",
        specifications: {
            "Purity": "98% min",
            "NaCl": "0.03% max",
            "Fe": "15 ppm max",
            "Packaging": "25kg bags/drums"
        }
    },
    // Product 35: Chemicals - Sulfuric Acid
    {
        id: 35,
        name: "Sulfuric Acid (98% Tech Grade)",
        category: "chemicals",
        rating: 4.5,
        supplier: {
            name: "GNFC Ltd",
            location: "Gujarat, India",
            experience: "40 years experience"
        },
        certifications: ["ISO", "BIS"],
        moq: "50 MT",
        leadTime: "5-7 days",
        capacity: "10,000 MT/month",
        description: "Technical grade sulfuric acid for industrial applications. Available in various concentrations.",
        specifications: {
            "Concentration": "98%",
            "Iron": "30 ppm max",
            "Residue": "0.03% max",
            "Packaging": "IBC/Tanker"
        }
    },
    // Product 36: Chemicals - Soda Ash
    {
        id: 36,
        name: "Soda Ash (Dense Grade)",
        category: "chemicals",
        rating: 4.6,
        supplier: {
            name: "Tata Chemicals",
            location: "Gujarat, India",
            experience: "80 years experience"
        },
        certifications: ["ISO", "BIS"],
        moq: "25 MT",
        leadTime: "5-7 days",
        capacity: "3000 MT/month",
        description: "High-quality dense soda ash for glass, detergent, and chemical industries.",
        specifications: {
            "Purity": "99.2% min",
            "Bulk Density": "1.0 g/cc",
            "NaCl": "0.5% max",
            "Packaging": "50kg bags"
        }
    },
    // Product 37: Wood - Teak
    {
        id: 37,
        name: "Burma Teak Wood Logs",
        category: "wood",
        rating: 4.9,
        supplier: {
            name: "Indian Timber Co",
            location: "Kerala, India",
            experience: "45 years experience"
        },
        certifications: ["FSC", "PEFC"],
        moq: "50 CBM",
        leadTime: "14-21 days",
        capacity: "500 CBM/month",
        description: "Premium Burma teak wood logs known for durability and beautiful grain. Ideal for furniture and construction.",
        specifications: {
            "Origin": "Myanmar",
            "Diameter": "30cm+",
            "Length": "6-12 feet",
            "Packaging": "Loose"
        }
    },
    // Product 38: Wood - Sal
    {
        id: 38,
        name: "Sal Wood (Shorea Robusta)",
        category: "wood",
        rating: 4.6,
        supplier: {
            name: "Eastern Timber",
            location: "Jharkhand, India",
            experience: "25 years experience"
        },
        certifications: ["FSC", "Legal"],
        moq: "25 CBM",
        leadTime: "10-14 days",
        capacity: "300 CBM/month",
        description: "High-density sal wood for heavy construction and industrial use. Excellent strength and durability.",
        specifications: {
            "Density": "870-1050 kg/m³",
            "Moisture": "12% max",
            "Form": "Logs/Sawn",
            "Packaging": "Loose"
        }
    },
    // Product 39: Plywood - Marine
    {
        id: 39,
        name: "Marine Grade Plywood (BWP)",
        category: "plywood",
        rating: 4.8,
        supplier: {
            name: "Greenply Industries",
            location: "Gujarat, India",
            experience: "30 years experience"
        },
        certifications: ["ISI", "ISO", "BWP"],
        moq: "500 sheets",
        leadTime: "7-10 days",
        capacity: "50,000 sheets/month",
        description: "Premium marine grade plywood with BWP certification. Suitable for humid conditions and exterior use.",
        specifications: {
            "Grade": "BWP (Boiling Water Proof)",
            "Thickness": "6-25mm",
            "Size": "8x4 feet",
            "Packaging": "Bundled"
        }
    },
    // Product 40: Plywood - MDF
    {
        id: 40,
        name: "MDF Board (Medium Density)",
        category: "plywood",
        rating: 4.6,
        supplier: {
            name: "Century Ply",
            location: "West Bengal, India",
            experience: "35 years experience"
        },
        certifications: ["ISI", "E1 Grade"],
        moq: "200 sheets",
        leadTime: "5-7 days",
        capacity: "30,000 sheets/month",
        description: "High-quality MDF boards with smooth surface. Ideal for furniture and interior applications.",
        specifications: {
            "Density": "700-850 kg/m³",
            "Thickness": "2.5-25mm",
            "Size": "8x4 feet",
            "Packaging": "Bundled"
        }
    },
    // Product 41: Leather - Buffalo
    {
        id: 41,
        name: "Full Grain Leather (Buffalo)",
        category: "leather",
        rating: 4.8,
        supplier: {
            name: "Chennai Tanneries",
            location: "Tamil Nadu, India",
            experience: "40 years experience"
        },
        certifications: ["LWG", "ISO"],
        moq: "500 sq.ft",
        leadTime: "14-21 days",
        capacity: "50,000 sq.ft/month",
        description: "Premium full grain buffalo leather for shoes, bags, and accessories. Excellent durability and finish.",
        specifications: {
            "Type": "Full Grain",
            "Thickness": "1.0-2.0mm",
            "Finish": "Various",
            "Packaging": "Bundles"
        }
    },
    // Product 42: Leather - Goat
    {
        id: 42,
        name: "Genuine Goat Leather",
        category: "leather",
        rating: 4.7,
        supplier: {
            name: "Kanpur Leather Works",
            location: "Uttar Pradesh, India",
            experience: "35 years experience"
        },
        certifications: ["LWG", "Eco-Friendly"],
        moq: "300 sq.ft",
        leadTime: "10-14 days",
        capacity: "25,000 sq.ft/month",
        description: "Soft and supple goat leather ideal for garments and accessories. Eco-friendly tanning process.",
        specifications: {
            "Type": "Goat Skin",
            "Thickness": "0.6-1.2mm",
            "Finish": "Nappa/Suede",
            "Packaging": "Bundles"
        }
    },
    // Product 43: Leather - Wallets
    {
        id: 43,
        name: "Leather Wallets & Small Goods",
        category: "leather",
        rating: 4.6,
        supplier: {
            name: "Agra Leather Exports",
            location: "Uttar Pradesh, India",
            experience: "20 years experience"
        },
        certifications: ["LWG", "ISO"],
        moq: "500 pieces",
        leadTime: "21-30 days",
        capacity: "10,000 pcs/month",
        description: "Handcrafted leather wallets and small leather goods. Premium quality with excellent craftsmanship.",
        specifications: {
            "Material": "Genuine Leather",
            "Type": "Wallets/Belts/Accessories",
            "Finish": "Hand-finished",
            "Packaging": "Gift boxes"
        }
    },
    // Product 44: Engineering - Bearings
    {
        id: 44,
        name: "Industrial Ball Bearings",
        category: "engineering",
        rating: 4.7,
        supplier: {
            name: "NEI Bearings",
            location: "Rajasthan, India",
            experience: "50 years experience"
        },
        certifications: ["ISO 9001", "IATF"],
        moq: "1000 units",
        leadTime: "14-21 days",
        capacity: "100,000 units/month",
        description: "Precision ball bearings for automotive and industrial applications. High load capacity and durability.",
        specifications: {
            "Type": "Deep Groove/Angular",
            "Size Range": "6mm-100mm ID",
            "Precision": "P0/P6",
            "Packaging": "Cartons"
        }
    },
    // Product 45: Engineering - CNC
    {
        id: 45,
        name: "CNC Machined Components",
        category: "engineering",
        rating: 4.8,
        supplier: {
            name: "Precision Engineering",
            location: "Pune, India",
            experience: "25 years experience"
        },
        certifications: ["ISO 9001", "AS9100"],
        moq: "500 units",
        leadTime: "21-30 days",
        capacity: "25,000 units/month",
        description: "Precision CNC machined components for aerospace and automotive sectors. Tight tolerances and superior finish.",
        specifications: {
            "Material": "Aluminum/Steel/Brass",
            "Tolerance": "±0.01mm",
            "Finish": "Anodized/Plated",
            "Packaging": "Custom"
        }
    },
    // Product 46: Electronics - LED
    {
        id: 46,
        name: "LED Panel Lights (18W)",
        category: "electronics",
        rating: 4.5,
        supplier: {
            name: "BrightTech LED",
            location: "Gujarat, India",
            experience: "12 years experience"
        },
        certifications: ["BIS", "CE", "RoHS"],
        moq: "500 units",
        leadTime: "10-14 days",
        capacity: "50,000 units/month",
        description: "Energy-efficient LED panel lights with long lifespan. Suitable for commercial and residential applications.",
        specifications: {
            "Wattage": "18W",
            "Lumens": "1800 lm",
            "Color Temp": "3000K-6500K",
            "Packaging": "Cartons"
        }
    },
    // Product 47: Electronics - Solar
    {
        id: 47,
        name: "Solar PV Modules (540W Mono)",
        category: "electronics",
        rating: 4.8,
        supplier: {
            name: "Waaree Energies",
            location: "Gujarat, India",
            experience: "15 years experience"
        },
        certifications: ["ALMM", "BIS", "IEC"],
        moq: "100 modules",
        leadTime: "14-21 days",
        capacity: "10,000 modules/month",
        description: "High-efficiency monocrystalline solar modules. ALMM listed with excellent performance warranty.",
        specifications: {
            "Power": "540W",
            "Efficiency": "21%+",
            "Type": "Mono PERC",
            "Packaging": "Palletized"
        }
    },
    // Product 48: Handicrafts - Brass
    {
        id: 48,
        name: "Brass Home Décor Items",
        category: "handicrafts",
        rating: 4.7,
        supplier: {
            name: "Moradabad Crafts",
            location: "Uttar Pradesh, India",
            experience: "50 years experience"
        },
        certifications: ["Handmade", "GI Tag"],
        moq: "200 pieces",
        leadTime: "21-30 days",
        capacity: "5,000 pcs/month",
        description: "Traditional brass handicrafts from Moradabad, the brass city of India. Exquisite handwork and unique designs.",
        specifications: {
            "Material": "Brass",
            "Finish": "Lacquered/Antique",
            "Type": "Decorative items",
            "Packaging": "Gift boxes"
        }
    },
    // Product 49: Handicrafts - Wood
    {
        id: 49,
        name: "Hand Carved Wooden Artifacts",
        category: "handicrafts",
        rating: 4.8,
        supplier: {
            name: "Saharanpur Wood Works",
            location: "Uttar Pradesh, India",
            experience: "60 years experience"
        },
        certifications: ["Handmade", "Eco-Friendly"],
        moq: "100 pieces",
        leadTime: "30-45 days",
        capacity: "2,000 pcs/month",
        description: "Exquisite hand-carved wooden artifacts from Saharanpur. Each piece is a unique work of art.",
        specifications: {
            "Material": "Sheesham/Teak",
            "Finish": "Natural/Polished",
            "Type": "Decorative/Functional",
            "Packaging": "Custom"
        }
    },
    // Product 50: Gems - Diamonds
    {
        id: 50,
        name: "Polished Cut Diamonds",
        category: "gems",
        rating: 4.9,
        supplier: {
            name: "Surat Diamond Hub",
            location: "Gujarat, India",
            experience: "40 years experience"
        },
        certifications: ["GIA Certified", "Kimberley"],
        moq: "10 carats",
        leadTime: "7-14 days",
        capacity: "1000 carats/month",
        description: "GIA certified polished diamonds in various cuts and clarity. Ethically sourced with Kimberley certification.",
        specifications: {
            "Cut": "Round/Princess/Oval",
            "Clarity": "VVS-SI",
            "Color": "D-J",
            "Packaging": "Secure parcel"
        }
    },
    // Product 51: Gems - Gold Jewelry
    {
        id: 51,
        name: "22K Gold Jewelry (Handmade)",
        category: "gems",
        rating: 4.8,
        supplier: {
            name: "Jaipur Jewels Export",
            location: "Rajasthan, India",
            experience: "35 years experience"
        },
        certifications: ["BIS Hallmark", "HUID"],
        moq: "100 grams",
        leadTime: "14-21 days",
        capacity: "5 kg/month",
        description: "Traditional handmade 22K gold jewelry with BIS hallmark. Exquisite craftsmanship from Jaipur artisans.",
        specifications: {
            "Purity": "22K (916)",
            "Style": "Traditional/Modern",
            "Finish": "Matte/Polished",
            "Packaging": "Velvet boxes"
        }
    },
    // Product 52: Agriculture - Seeds
    {
        id: 52,
        name: "Hybrid Vegetable Seeds",
        category: "agriculture",
        rating: 4.6,
        supplier: {
            name: "Namdhari Seeds",
            location: "Karnataka, India",
            experience: "30 years experience"
        },
        certifications: ["ISTA", "ISO"],
        moq: "100 kg",
        leadTime: "7-10 days",
        capacity: "10 MT/month",
        description: "High-yielding hybrid vegetable seeds with excellent germination rate. Suitable for various climatic conditions.",
        specifications: {
            "Germination": "85%+",
            "Purity": "98%+",
            "Types": "Tomato/Pepper/Cucumber",
            "Packaging": "Sealed pouches"
        }
    },
    // Product 53: Agriculture - Fertilizer
    {
        id: 53,
        name: "NPK Fertilizer (19:19:19)",
        category: "agriculture",
        rating: 4.5,
        supplier: {
            name: "Coromandel Intl",
            location: "Andhra Pradesh, India",
            experience: "50 years experience"
        },
        certifications: ["FCO", "BIS"],
        moq: "50 MT",
        leadTime: "5-7 days",
        capacity: "5000 MT/month",
        description: "Balanced NPK fertilizer for all crops. Water-soluble grade available for fertigation.",
        specifications: {
            "Grade": "19:19:19",
            "Form": "Granular/WSF",
            "Solubility": "100% (WSF)",
            "Packaging": "50kg bags"
        }
    },
    // Product 54: Consumer - Mixer
    {
        id: 54,
        name: "Mixer Grinder (750W)",
        category: "consumer",
        rating: 4.5,
        supplier: {
            name: "TTK Prestige",
            location: "Maharashtra, India",
            experience: "60 years experience"
        },
        certifications: ["BIS", "ISI"],
        moq: "200 units",
        leadTime: "10-14 days",
        capacity: "20,000 units/month",
        description: "Powerful 750W mixer grinder for home kitchen use. Durable motor with multiple jars.",
        specifications: {
            "Power": "750W",
            "Jars": "3 jars",
            "Speed": "3-speed control",
            "Packaging": "Cartons"
        }
    },
    // Product 55: Consumer - Cookware
    {
        id: 55,
        name: "Stainless Steel Cookware Set",
        category: "consumer",
        rating: 4.7,
        supplier: {
            name: "Wazirabad Utensils",
            location: "Punjab, India",
            experience: "40 years experience"
        },
        certifications: ["Food Grade", "BIS"],
        moq: "500 sets",
        leadTime: "14-21 days",
        capacity: "10,000 sets/month",
        description: "Premium stainless steel cookware set with multiple pieces. Food-grade quality with excellent finish.",
        specifications: {
            "Material": "SS 304",
            "Pieces": "10-15 pieces",
            "Finish": "Mirror Polish",
            "Packaging": "Gift boxes"
        }
    }
];

// Helper function to get product by ID
function getProductById(id) {
    return PRODUCTS_DATA.find(p => p.id === parseInt(id));
}

// Category display names mapping
const CATEGORY_NAMES = {
    'steel': 'Steel Products',
    'nonferrous': 'Non Ferrous Metals',
    'polymers': 'Polymers & Plastics',
    'chemicals': 'Chemicals',
    'wood': 'Natural Wood',
    'plywood': 'Plywood & Boards',
    'leather': 'Leather & Leather Goods',
    'grains': 'Grains & Cereals',
    'pulses': 'Pulses & Lentils',
    'grocery': 'Grocery & Spices',
    'agriculture': 'Agriculture',
    'textiles': 'Textiles & Fabrics',
    'engineering': 'Engineering Goods',
    'electronics': 'Electronics',
    'building': 'Building Materials',
    'handicrafts': 'Handicrafts',
    'gems': 'Gems & Jewelry',
    'toys': 'Toys & Games',
    'consumer': 'Consumer Goods'
};

// Make available globally
if (typeof window !== 'undefined') {
    window.PRODUCTS_DATA = PRODUCTS_DATA;
    window.getProductById = getProductById;
    window.CATEGORY_NAMES = CATEGORY_NAMES;
}
