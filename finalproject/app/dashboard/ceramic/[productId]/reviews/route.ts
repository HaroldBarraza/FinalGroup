import { NextResponse } from 'next/server';
import { fetchReviews, addReview } from '@/app/lib/data';

interface RouteContext {
  params: {
    productId: string;
  };
}

function assertRouteContext(context: unknown): asserts context is RouteContext {
  if (!(context && typeof context === 'object' && 'params' in context)) {
    throw new Error('Invalid route context');
  }
}

export async function GET(
  request: Request,
  context: unknown
) {
  try {
    assertRouteContext(context);
    const { params } = context;
    const productId = params.productId;
    const reviews = await fetchReviews(Number(productId));
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Error fetching reviews' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request, 
  context: unknown
) {
  try {
    assertRouteContext(context);
    const { params } = context;
    const productId = await Promise.resolve(params.productId);
    const { rating, comment } = await request.json();
    const newReview = await addReview(
      Number(productId),
      rating,
      comment
    );
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { error: 'Error adding review' },
      { status: 500 }
    );
  }
}