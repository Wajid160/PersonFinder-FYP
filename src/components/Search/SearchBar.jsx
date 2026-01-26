import React, { useState } from 'react';
import { Search, MapPin, Building, Briefcase, GraduationCap, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        location: '',
        university: '',
        company: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ query, ...filters });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative z-20">
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-card border border-border rounded-full shadow-lg flex items-center p-2 pr-4 transition-all hover:shadow-xl hover:border-primary/50">
                        <div className="p-3 bg-secondary rounded-full mr-4 text-muted-foreground">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-xl text-foreground placeholder-muted-foreground"
                        />
                        <div className="flex items-center space-x-2 border-l border-border pl-4">
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2 rounded-full transition-colors ${showFilters ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'}`}
                                title="Toggle Filters"
                            >
                                {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                            </button>
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors cursor-pointer"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 p-6 bg-card border border-border rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" /> Location
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.location}
                                        onChange={(e) => handleFilterChange('location', e.target.value)}
                                        className="w-full bg-secondary border-none rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. New York"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                                        <GraduationCap className="w-3 h-3 mr-1" /> University
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.university}
                                        onChange={(e) => handleFilterChange('university', e.target.value)}
                                        className="w-full bg-secondary border-none rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. Stanford"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                                        <Briefcase className="w-3 h-3 mr-1" /> Company
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.company}
                                        onChange={(e) => handleFilterChange('company', e.target.value)}
                                        className="w-full bg-secondary border-none rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. Google"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default SearchBar;
