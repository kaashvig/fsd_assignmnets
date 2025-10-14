import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Profile, Order } from '../lib/supabase';
import { User, Package, LogOut, Mail, Calendar, ShoppingBag, DollarSign } from 'lucide-react';

interface DashboardProps {
  onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  // Load profile and orders on mount or when user changes
  useEffect(() => {
    if (user) loadUserData();
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Fetch profile from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData ?? null);

      // Fetch user orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData ?? []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {profile?.full_name ?? user?.email ?? 'User'}!
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back to Shop
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card icon={<ShoppingBag className="w-6 h-6 text-blue-600" />} label="Total Orders" value={orders.length} color="blue" />
          <Card icon={<DollarSign className="w-6 h-6 text-green-600" />} label="Total Spent" value={`$${totalSpent.toFixed(2)}`} color="green" />
          <Card icon={<Package className="w-6 h-6 text-yellow-600" />} label="Pending Orders" value={pendingOrders} color="yellow" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b flex">
            <TabButton active={activeTab === 'profile'} label="Profile Information" onClick={() => setActiveTab('profile')} />
            <TabButton active={activeTab === 'orders'} label="Order History" onClick={() => setActiveTab('orders')} />
          </div>
          <div className="p-6">
            {activeTab === 'profile' ? <ProfileInfo profile={profile} /> : <OrderHistory orders={orders} />}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Subcomponents ---

const Card = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: 'blue' | 'green' | 'yellow' }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center gap-4">
      <div className={`p-3 bg-${color}-100 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const TabButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-6 py-4 font-semibold transition-colors ${
      active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {label}
  </button>
);

const ProfileInfo = ({ profile }: { profile: Profile | null }) => (
  <div className="space-y-6">
    <InfoRow icon={<User className="w-8 h-8 text-gray-600" />} label="Full Name" value={profile?.full_name ?? 'Not set'} />
    <InfoRow icon={<Mail className="w-8 h-8 text-gray-600" />} label="Email Address" value={profile?.email ?? 'Not set'} />
    <InfoRow
      icon={<Calendar className="w-8 h-8 text-gray-600" />}
      label="Member Since"
      value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
    />
  </div>
);



const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
    {icon}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const OrderHistory = ({ orders }: { orders: Order[] }) => (
  <div className="space-y-4">
    {orders.length === 0 ? (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">No orders yet</p>
        <p className="text-gray-500 text-sm mt-2">Start shopping to see your orders here</p>
      </div>
    ) : (
      orders.map(order => (
        <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{order.product_name}</h3>
              <p className="text-sm text-gray-600 mt-1">Order ID: {order.id.slice(0, 8)}...</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : order.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Quantity</p>
              <p className="font-semibold text-gray-900">{order.quantity}</p>
            </div>
            <div>
              <p className="text-gray-600">Total</p>
              <p className="font-semibold text-gray-900">${Number(order.total_amount).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-semibold text-gray-900">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
