/* !! WARNING !!
- Do not hardcode secrets in your code (important for production)
- This is just for demonstration purposes (and to keep things simple)
- Truly not secure for production environments ... you try? ... haaamnn...
- Use a secure method to store secrets like
- HashiCorp KeyVault, AWS Secrets Manager or PHASE. Capiche?
*/

const JWT_SECRET = process.env.JWT_SECRET || 'ABCDEF123456';