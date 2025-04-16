import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()
  
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }
  
    return NextResponse.json({ message: 'Updated successfully' })
  }
  