import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plane, Laptop, Heart, Home, Sparkles, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { getAllBlogPosts } from '../utils/blogLoader';

export function LifestylePicks() {
    const petPosts = useMemo(() => {
        const posts = getAllBlogPosts();
        return posts.filter(post => post.category === 'Pet Care' || post.tags.some(tag => tag.toLowerCase().includes('pet') || tag.toLowerCase().includes('dog')));
    }, []);

    const categories = [
        {
            icon: Plane,
            emoji: '✈️',
            title: 'Travel Essentials',
            description: 'Products that make trips smoother — from packing aids to comfort essentials.',
            link: '#travel',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'
        },
        {
            icon: Laptop,
            emoji: '💻',
            title: 'Work From Anywhere',
            description: 'Tools and gear that support remote work, flexible schedules, and location-independent lifestyles.',
            link: '#work',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
        },
        {
            icon: Heart,
            emoji: '🐶',
            title: 'Pet & Family Travel',
            description: 'Food, accessories, and essentials designed for pets and families on the move.',
            link: '#family',
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50'
        },
        {
            icon: Home,
            emoji: '🏠',
            title: 'Everyday Lifestyle',
            description: 'Reliable products that simplify daily routines and decision-making.',
            link: '#everyday',
            gradient: 'from-orange-500 to-amber-500',
            bgGradient: 'from-orange-50 to-amber-50'
        }
    ];

    const curationPrinciples = [
        {
            icon: CheckCircle2,
            title: 'Practical usefulness',
            description: 'Every product serves a real purpose in modern life'
        },
        {
            icon: CheckCircle2,
            title: 'Trust & availability',
            description: 'Reliable brands and accessible purchasing options'
        },
        {
            icon: CheckCircle2,
            title: 'Lifestyle compatibility',
            description: 'Products that fit how people actually live today'
        },
        {
            icon: CheckCircle2,
            title: 'Real-world scenarios',
            description: 'Tested for travel, work, pets, and family situations'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 pt-32">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Subtitle Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-medium">Smart picks for modern living</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight">
                        Lifestyle Picks
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
                            by Gubbu
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-center text-purple-100 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Smart picks for modern living — travel, work, and everyday life.
                    </p>

                    {/* Hero Content */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                Modern life comes with endless choices.
                            </h2>
                            <p className="text-lg md:text-xl text-purple-100 mb-6 leading-relaxed">
                                Gubbu curates trusted products and essentials that support how people actually live today — travel-ready, flexible, and thoughtfully chosen.
                            </p>
                            <div className="space-y-4 text-lg md:text-xl">
                                <p className="font-semibold">We don't chase deals.</p>
                                <p className="text-purple-100">We recommend what fits real decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How We Curate Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            How We Curate
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Every product featured in Lifestyle Picks is selected based on clear principles
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {curationPrinciples.map((principle, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <principle.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-900">{principle.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                            No clutter. No noise. Just clarity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Categories</h2>
                        <p className="text-xl text-gray-600">Curated collections for every aspect of modern life</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative p-10">
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                            <span className="text-4xl">{category.emoji}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                                        {category.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        {category.description}
                                    </p>

                                    {/* CTA Button */}
                                    <a
                                        href={category.link}
                                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                                    >
                                        <span>Explore {category.title.split(' ')[0]} Picks</span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </a>
                                </div>

                                {/* Decorative Element */}
                                <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${category.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pet & Family Picks Section */}
            <section id="family" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                            <span className="text-2xl">🐶</span>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pet & Family Picks</h2>
                            <p className="text-lg text-gray-600 mt-1">Travel comfortably with your four-legged friends</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {petPosts.map((post) => (
                            <Link key={post.id} to={`/blog/${post.id}`} className="group">
                                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <Calendar className="h-4 w-4" />
                                            <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                            Read Guide <ArrowRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section >

            {/* Why Gubbu Picks Section */}
            < section className="py-20 bg-white" >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 md:p-16 border border-indigo-100 shadow-xl">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Why Gubbu Picks
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                                Gubbu sits at the intersection of travel, technology, and lifestyle.
                            </p>
                            <p className="text-lg md:text-xl text-gray-600 mt-4 leading-relaxed max-w-3xl mx-auto">
                                Our recommendations come from understanding how decisions connect — not from pushing products.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Soft CTA Section */}
            < section className="py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden" >
                {/* Animated Background */}
                < div className="absolute inset-0 opacity-10" >
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
                </div >

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        Looking for experiences, stays, or trips to match your lifestyle?
                    </h2>
                    <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
                        Discover destinations and travel options curated by Gubbu
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/destinations">
                            <Button
                                size="lg"
                                className="bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                <Plane className="h-5 w-5 mr-2" />
                                Explore Destinations with Gubbu
                            </Button>
                        </a>
                        <a href="/destinations">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                            >
                                Browse Destinations
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </a>
                    </div>
                </div>
            </section >

            {/* Footer Disclosure */}
            < section className="py-12 bg-gray-50 border-t border-gray-200" >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="h-5 w-5 text-indigo-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Transparency Note</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Some links on this page may be affiliate links. Gubbu may earn a commission when you purchase through them, helping us continue building decision-focused tools and content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}
