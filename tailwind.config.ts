import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',


  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			  	mycolor1:"#1D1616",
			  	mycolor2:"#8E1616",
			  	mycolor3:"#D84040",
			  	mycolor4:"#EEEEEE",
			  	mycolor5:"#A8DADC",
			  	mycolor6:"#457B9D",
			  	mycolor7:"#1D3557",
			  	mycolor8:"#FF6F61",
			  	mycolor9:"#6B5B95",
			  	mycolor10:"#A6A6A6",
				mycolor11 : "#D72638",
				mycolor12 : "#EB7532",
				mycolor13 : "#F7D038",
				mycolor14 : "#3C91E6",
				mycolor15 : "#46B1C9",
				mycolor16 : "#2D6A4F",
				mycolor17 : "#1B4965",
				mycolor18 : "#008F8C",
				mycolor19 : "#6A0572",
				mycolor20 : "#D90368",
				mycolor21 : "#F72585",
				mycolor22 : "#4F5D75",
				mycolor23 : "#2C363F",
				mycolor24 : "#1E1E24",
				mycolor25 : "#F8F9FA",
				mycolor26 : "#fbc439",

  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
