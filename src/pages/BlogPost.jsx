import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '../components/Button';

export function BlogPost() {
  const { id } = useParams();

  const post = {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia',
    author: 'Sarah Johnson',
    date: 'December 15, 2024',
    readTime: '8 min read',
    category: 'Destinations',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&auto=format&fit=crop',
    content: `
      <p class="text-lg mb-6">Southeast Asia is known for its popular destinations like Bangkok, Bali, and Singapore, but the region is filled with countless hidden gems waiting to be discovered. In this comprehensive guide, we'll take you through ten incredible destinations that most tourists miss.</p>

      <h2 class="text-3xl font-bold mt-8 mb-4">1. Luang Prabang, Laos</h2>
      <p class="mb-4">This UNESCO World Heritage site is a perfect blend of traditional Lao architecture and French colonial influences. Wake up early to witness the daily alms-giving ceremony, where hundreds of monks walk through the streets collecting offerings.</p>
      <p class="mb-6">Don't miss the stunning Kuang Si Falls, just a short drive from the city. The turquoise pools are perfect for swimming, and the surrounding jungle is home to rescued bears at the nearby sanctuary.</p>

      <h2 class="text-3xl font-bold mt-8 mb-4">2. Hoi An, Vietnam</h2>
      <p class="mb-4">While not entirely unknown, Hoi An's ancient town offers a magical experience, especially at night when thousands of lanterns illuminate the streets. The town is famous for its tailor shops, where you can get custom-made clothes at incredibly affordable prices.</p>
      <p class="mb-6">Take a cooking class to learn authentic Vietnamese cuisine, or rent a bicycle to explore the nearby rice paddies and beaches.</p>

      <h2 class="text-3xl font-bold mt-8 mb-4">3. Koh Rong, Cambodia</h2>
      <p class="mb-4">This island paradise offers pristine beaches without the crowds of Thailand's more famous islands. The bioluminescent plankton in the waters around Koh Rong creates a magical swimming experience at night.</p>
      <p class="mb-6">Stay in a beachfront bungalow and enjoy fresh seafood while watching incredible sunsets over the Gulf of Thailand.</p>

      <h2 class="text-3xl font-bold mt-8 mb-4">4. Bagan, Myanmar</h2>
      <p class="mb-4">Home to over 2,000 ancient temples and pagodas, Bagan offers one of the most spectacular sunrise experiences in the world. Rent an e-bike to explore the archaeological zone at your own pace.</p>
      <p class="mb-6">For the ultimate experience, take a hot air balloon ride at dawn to see the temples emerging from the morning mist.</p>

      <h2 class="text-3xl font-bold mt-8 mb-4">5. Palawan, Philippines</h2>
      <p class="mb-4">Often called the last frontier of the Philippines, Palawan is home to stunning limestone cliffs, crystal-clear lagoons, and some of the best diving in the world. El Nido and Coron are the main tourist hubs, but venture further to find truly secluded beaches.</p>
      <p class="mb-6">The Underground River in Puerto Princesa is a UNESCO World Heritage site and one of the New Seven Wonders of Nature.</p>

      <h2 class="text-3xl font-bold mt-8 mb-4">Travel Tips</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Visit during shoulder season (April-May or September-October) for better weather and fewer crowds</li>
        <li>Learn a few basic phrases in the local language - it goes a long way</li>
        <li>Always carry cash, as many remote areas don't accept cards</li>
        <li>Respect local customs and dress modestly when visiting temples</li>
        <li>Book accommodations in advance during peak season</li>
      </ul>

      <h2 class="text-3xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">Southeast Asia's hidden gems offer authentic experiences away from the tourist crowds. These destinations provide incredible value for money, warm hospitality, and memories that will last a lifetime.</p>
      <p class="mb-6">Whether you're a budget backpacker or a luxury traveler, these hidden gems have something special to offer. Start planning your Southeast Asian adventure today!</p>
    `,
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Budget Travel Tips for 2024',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop',
      category: 'Tips',
    },
    {
      id: 3,
      title: 'Best Time to Visit European Cities',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&auto=format&fit=crop',
      category: 'Planning',
    },
    {
      id: 4,
      title: 'Solo Travel Safety Guide',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=crop',
      category: 'Safety',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
              <div className="ml-auto flex gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Planning Your Trip?</h3>
                <p className="text-gray-700 mb-6">
                  Find the best deals on hotels and flights for your Southeast Asian adventure
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/hotels">
                    <Button>Browse Hotels</Button>
                  </Link>
                  <Link to="/flights">
                    <Button variant="outline">Search Flights</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Link 
              key={relatedPost.id} 
              to={`/blog/${relatedPost.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img 
                  src={relatedPost.image} 
                  alt={relatedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {relatedPost.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold hover:text-primary-600 transition-colors">
                  {relatedPost.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
