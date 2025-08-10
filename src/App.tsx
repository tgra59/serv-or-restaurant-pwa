import { useState, useEffect } from 'react'
import { Search, Settings as SettingsIcon, X } from 'lucide-react'
import type { MenuItem } from './types'
import { useRestaurants } from './hooks/useRestaurants'
import { useOrders } from './hooks/useOrders'
import { useSearch } from './hooks/useSearch'
import { useTheme } from './hooks/useTheme'
import { ModifierModal } from './components/ModifierModal'
import { OrderIdentifierModal } from './components/OrderIdentifierModal'
import { Settings } from './components/Settings'

function App() {
  const [activeTab, setActiveTab] = useState<'take' | 'review'>('take')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [isModifierModalOpen, setIsModifierModalOpen] = useState(false)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showOrderIdentifierModal, setShowOrderIdentifierModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const { activeRestaurant } = useRestaurants()
  useTheme() // Initialize theme on app startup
  const { 
    activeOrders, 
    currentOrder, 
    addItemToCurrentOrder, 
    clearCurrentOrder, 
    finalizeOrder,
    archiveOrder,
    shouldResetOrders,
    resetOrders
  } = useOrders()
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredCategories,
    searchSuggestions,
    clearSearch,
    selectSuggestion,
    hasActiveFilters
  } = useSearch(activeRestaurant)

  // Check for daily reset on app load
  useEffect(() => {
    if (shouldResetOrders()) {
      resetOrders()
    }
  }, [shouldResetOrders, resetOrders])

  // Reset UI state when active restaurant changes
  useEffect(() => {
    setExpandedCategory(null)
    clearSearch()
    setIsModifierModalOpen(false)
    setSelectedMenuItem(null)
  }, [activeRestaurant?.id, clearSearch])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const handleItemClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem)
    setIsModifierModalOpen(true)
  }

  const handleAddToOrder = (orderItem: any) => {
    addItemToCurrentOrder(orderItem)
    // Clear search and reset view after adding an item
    if (searchQuery || selectedCategory) {
      clearSearch()
      setExpandedCategory(null)
    }
  }

  const handleFinalizeOrder = () => {
    if (currentOrder.length === 0) return
    setShowOrderIdentifierModal(true)
  }

  const handleOrderIdentifierSubmit = (identifier: string) => {
    const success = finalizeOrder(identifier)
    if (success) {
      setNotification(`Order for ${identifier} saved!`)
      setTimeout(() => setNotification(null), 2000)
      
      // Scroll to top smoothly after order finalization
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const handleArchiveOrder = (orderId: string) => {
    archiveOrder(orderId)
  }

  const formatOrderTime = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins === 1) return '1 min ago'
    if (diffMins < 60) return `${diffMins} mins ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return '1 hour ago'
    return `${diffHours} hours ago`
  }

  return (
    <div className="min-h-screen bg-background ios-safe-area">
      <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col" key={activeRestaurant?.id}>
        {/* Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h1 className="text-xl font-bold text-foreground mb-2">Order Management</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              {activeRestaurant?.name || 'No Restaurant Selected'}
            </span>
            <button 
              onClick={() => setShowSettings(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium border border-border rounded-lg bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <SettingsIcon className="w-4 h-4 mr-1" />
              Settings
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-border mb-6">
          <button 
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'take' 
                ? 'text-primary border-primary' 
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
            onClick={() => setActiveTab('take')}
          >
            Take Order
          </button>
          <button 
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'review' 
                ? 'text-primary border-primary' 
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
            onClick={() => setActiveTab('review')}
          >
            Review Orders ({activeOrders.length})
          </button>
        </div>

        {/* Take Order Tab */}
        {activeTab === 'take' && (
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                ref={setSearchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchSuggestions(e.target.value.length >= 2)
                }}
                onFocus={() => setShowSearchSuggestions(searchQuery.length >= 2)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchSuggestions.length > 0) {
                    e.preventDefault()
                    const firstSuggestion = searchSuggestions[0]
                    if (firstSuggestion.type === 'item' && firstSuggestion.item) {
                      setShowSearchSuggestions(false)
                      handleItemClick(firstSuggestion.item)
                    } else {
                      selectSuggestion(firstSuggestion)
                      setShowSearchSuggestions(false)
                    }
                  } else if (e.key === 'Escape') {
                    clearSearch()
                    setShowSearchSuggestions(false)
                  }
                }}
                className="w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Search items... (Press Enter to select first result)"
              />
              {hasActiveFilters && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
              
              {/* Search Suggestions */}
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (suggestion.type === 'item' && suggestion.item) {
                          // Directly open modifier modal for item suggestions
                          setShowSearchSuggestions(false)
                          handleItemClick(suggestion.item)
                        } else {
                          // For category suggestions, use the existing behavior
                          selectSuggestion(suggestion)
                          setShowSearchSuggestions(false)
                        }
                      }}
                      className="w-full p-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          suggestion.type === 'item' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {suggestion.type === 'item' ? 'ADD ITEM' : 'CATEGORY'}
                        </span>
                        <span>{suggestion.text}</span>
                        {suggestion.type === 'item' && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            Click to add →
                          </span>
                        )}
                      </div>
                      {suggestion.item && (
                        <p className="text-sm text-muted-foreground mt-1 ml-12">
                          {suggestion.item.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Category: {activeRestaurant?.menu.categories.find(c => c.id === selectedCategory)?.name}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:bg-accent rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Categories */}
            <div className="space-y-4 mb-6">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {hasActiveFilters ? 'No items match your search.' : 'No menu items available.'}
                </div>
              ) : (
                filteredCategories.map(category => (
                  <div key={category.id} className="bg-card border border-border rounded-lg overflow-hidden">
                    <button 
                      className="w-full p-4 bg-secondary hover:bg-accent text-left flex justify-between items-center font-semibold transition-colors"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>{category.name} ({category.items.length})</span>
                      <span className="text-lg">{expandedCategory === category.id ? '−' : '+'}</span>
                    </button>
                    {expandedCategory === category.id && (
                      <div className="p-4 space-y-3">
                        {category.items.map(item => (
                          <div 
                            key={item.id}
                            className="p-3 border border-border rounded-lg cursor-pointer hover:border-ring hover:shadow-sm transition-all"
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="font-semibold mb-1">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                            {item.modifiers.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  Customizable
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Review Orders Tab */}
        {activeTab === 'review' && (
          <div className="flex-1">
            <div className="space-y-4">
              {activeOrders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No active orders</p>
                  <p className="text-sm mt-1">Completed orders will appear here</p>
                </div>
              ) : (
                activeOrders.map(order => (
                  <div key={order.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-border">
                      <span className="font-bold text-primary">{order.identifier}</span>
                      <small className="text-muted-foreground">
                        {formatOrderTime(new Date(order.timestamp))}
                      </small>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.menuItemName}</span>
                            <span>{item.quantity}x</span>
                          </div>
                          {item.selectedModifiers.length > 0 && (
                            <div className="ml-4 space-y-1">
                              {item.selectedModifiers.map((modifier, modIndex) => (
                                <div key={modIndex} className="text-sm text-muted-foreground">
                                  <span className="font-medium">{modifier.modifierName}:</span>{' '}
                                  {modifier.selectedOptions.join(', ')}
                                </div>
                              ))}
                            </div>
                          )}
                          {item.customModifiers.length > 0 && (
                            <div className="ml-4 text-sm text-muted-foreground">
                              <span className="font-medium">Special:</span>{' '}
                              {item.customModifiers.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleArchiveOrder(order.id)}
                      className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Mark Complete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className={`rounded-lg p-6 mt-auto shadow-lg transition-all duration-200 ${
          currentOrder.length > 0 
            ? 'bg-primary/10 border-2 border-primary/30 ring-1 ring-primary/20' 
            : 'bg-card border border-border'
        }`}>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
            <h3 className="font-semibold">
              Current Order 
              {currentOrder.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({currentOrder.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
              )}
            </h3>
            <button 
              className="px-3 py-1 text-sm font-medium border border-border rounded-lg bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
              onClick={clearCurrentOrder}
              disabled={currentOrder.length === 0}
            >
              Clear
            </button>
          </div>
          <div className="mb-4 max-h-40 overflow-y-auto">
            {currentOrder.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No items added yet</p>
            ) : (
              currentOrder.map((item, index) => (
                <div key={index} className="space-y-1 py-2 border-b border-border last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">{item.menuItemName}</div>
                      {item.selectedModifiers.length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.selectedModifiers.map((modifier, modIndex) => (
                            <div key={modIndex}>
                              <span className="font-medium">{modifier.modifierName}:</span>{' '}
                              {modifier.selectedOptions.join(', ')}
                            </div>
                          ))}
                        </div>
                      )}
                      {item.customModifiers.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Special:</span> {item.customModifiers.join(', ')}
                        </div>
                      )}
                    </div>
                    <span className="ml-2 font-medium">{item.quantity}x</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <button 
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleFinalizeOrder}
            disabled={currentOrder.length === 0}
          >
            Finalize Order
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      {activeTab === 'take' && (
        <button 
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-xl"
          onClick={() => {
            if (searchInputRef) {
              searchInputRef.focus()
              searchInputRef.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }}
          title="Focus search (Quick add items)"
        >
          <Search className="w-6 h-6" />
        </button>
      )}

      {/* Modifier Modal */}
      <ModifierModal
        isOpen={isModifierModalOpen}
        onClose={() => {
          setIsModifierModalOpen(false)
          setSelectedMenuItem(null)
        }}
        menuItem={selectedMenuItem}
        onAddToOrder={handleAddToOrder}
      />

      {/* Order Identifier Modal */}
      <OrderIdentifierModal
        isOpen={showOrderIdentifierModal}
        onClose={() => setShowOrderIdentifierModal(false)}
        onSubmit={handleOrderIdentifierSubmit}
      />

      {/* Settings Modal */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-right-5 duration-300">
          {notification}
        </div>
      )}
    </div>
  )
}

export default App
