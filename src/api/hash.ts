// import bcrypt from 'bcrypt'

// export async function POST(req, res) {
//   const { password } = req.body

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10)
//     res.status(200).json({ hashedPassword })
//   } catch (error) {
//     console.error('Error hashing password:', error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }

// export async function GET({ params, request }) {
//   const response = await fetch(
//     'https://docs.astro.build/assets/full-logo-light.png'
//   )
//   return new Response(await response.arrayBuffer())
// }
