// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated : boolean,
  message?:string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.data =="product"){
    try{
      await res.revalidate("/product/static");
      return res.json({ revalidated: true });
    } catch (error){
      return res.status(500).send({revalidated : false});
    }
  }
  return res.json({ revalidated: false, message : "pilih data mana yg mau di revalidate", });
}
