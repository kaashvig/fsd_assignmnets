import { Product } from '../types/product';
import { X, Star, Package, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseSuccess?: () => void;
}

export default function ProductModal({ product, isOpen, onClose, onPurchaseSuccess }: ProductModalProps) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePurchase = async () => {
    if (!user || !product) return;

    setPurchasing(true);
    setPurchaseMessage(null);

    try {
      const { error } = await supabase.from('orders').insert([
        {
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          quantity: quantity,
          total_amount: product.price * quantity,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setPurchaseMessage({ type: 'success', text: 'Order placed successfully!' });
      if (onPurchaseSuccess) {
        onPurchaseSuccess();
      }
      setTimeout(() => {
        onClose();
        setPurchaseMessage(null);
        setQuantity(1);
      }, 2000);
    } catch (error: any) {
      setPurchaseMessage({ type: 'error', text: error.message || 'Failed to place order' });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold text-gray-700">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Customer Rating</span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Category
                </h4>
                <p className="text-gray-700">{product.category}</p>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Availability
                </h4>
                <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Currently Unavailable'}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                  Description
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {user && product.inStock && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Quantity</h4>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-gray-600 ml-auto">
                      Total: ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {purchaseMessage && (
                <div
                  className={`mb-4 p-4 rounded-lg ${
                    purchaseMessage.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {purchaseMessage.text}
                </div>
              )}

              {user ? (
                <button
                  onClick={handlePurchase}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    product.inStock && !purchasing
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock || purchasing}
                >
                  {purchasing
                    ? 'Processing...'
                    : product.inStock
                    ? 'Purchase Now'
                    : 'Out of Stock'}
                </button>
              ) : (
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    Please sign in to purchase this product
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
