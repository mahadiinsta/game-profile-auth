export default function handler(req, res) {
  console.log(req, res)
  res.status(200).json({ email: 'mahadi@isntawebnwor.com.au' })
}
