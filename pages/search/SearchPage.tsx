import { useState, useRef } from 'react';
import { styles } from './SearchPageStyles';
import RecommendedChannel from '@/widgets/Followed/RecommendedChannel/RecommendedChannel';
import { searchListData } from '@/shared/api/testData';

import FiltersIcon from '@/shared/icons/search-icons/Filters-1.svg'
import FiltersSelectedIcon from '@/shared/icons/search-icons/Filters.svg'
import CloseIcon from '@/shared/icons/search-icons/Close.svg'
import AngleIcon from '@/shared/icons/search-icons/Angle.svg'

import {
    View,   
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    Animated,
    PanResponder,
} from 'react-native';

const Item = ({ title, isSelected, onPress }: { title: string, isSelected: boolean, onPress: () => void }) => (
    <TouchableOpacity
        style={[
            styles.item,
            { backgroundColor: isSelected ? "#000000" : "#E6E6E6" }, 
        ]}
        onPress={onPress}
    >        
        <Text style={{ color: isSelected ? "#ffffff" : "#000000" }}>
            {title || " "}
        </Text>
    </TouchableOpacity>
);

const FilterDropdown = ({
    label,
    options,
    isOpen,
    onToggle,
}: {
    label: string;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        onToggle();
    };

    return (
        <View>
            <TouchableOpacity style={styles.dropdownButton} onPress={onToggle}>
                <Text style={styles.dropdownButtonText}>{selectedItem || label}</Text>
                <AngleIcon />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownOverlay}>
                    <View style={styles.dropdown}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const FeatureItem = ({
    label,
    isSelected,
    onSelect,
}: {
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}) => {
    return (
        <TouchableOpacity
            style={[styles.featureItem, isSelected && styles.selectedFeatureItem]}
            onPress={onSelect}
        >
            <Text
                style={[
                    styles.featureItemText,
                    isSelected && styles.selectedFeatureItemText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default function SearchPage() {
    const [text, setText] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isSelected, setIsSelected] = useState(false);     
    const [isVisible, setIsVisible] = useState(false);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const toggleDropdown = (dropdownName: string) => {
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const handleSelect = (label: string) => {
        setSelectedFeatures((prevSelected) =>
            prevSelected.includes(label)
                ? prevSelected.filter((item) => item !== label)
                : [...prevSelected, label]
        );
    };
    
    const translateY = useRef(new Animated.Value(300)).current;
    
    const handlePress = (id: string) => {
        setSelectedId(id);
    };  
        
    const animateSheet = (toValue: number, callback?: () => void) => {
        Animated.timing(translateY, {
        toValue,
        duration: 250,
        useNativeDriver: true,
        }).start(() => {
        if (callback) callback();
        });
    };
    
    const toggleBottomSheet = () => {
        if (isVisible) {
        animateSheet(300, () => {
            setIsVisible(false);
            setIsSelected(false);
        });
        } else {
        setIsVisible(true);
        setIsSelected(true);
        animateSheet(0);
        }
    };
    
    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
            animateSheet(300, () => {
                setIsVisible(false);
                setIsSelected(false);
            });
            } else {
            animateSheet(0);
            }
        },
        })
    ).current;

    const featureLabels = [
        "Live",
        "4K",
        "HD",
        "Subtitles/CC",
        "Location",
        "Creative Commons",
        "360",
        "VR180",
        "3D",
        "HDR",
    ];

    return(
        
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter"                        
                        value={text}
                        onChangeText={setText}
                    />
                    {text.length > 0 && (   
                        <TouchableOpacity onPress={() => setText('')}>
                            <CloseIcon />
                        </TouchableOpacity>   
                    )}   
                </View>

                <View style={styles.offersList}>                                
                    <FlatList
                        data={[{ id: "0", icon: true }, ...searchListData]}
                        renderItem={({ item }) =>
                            item.icon ? (
                                <TouchableOpacity style={styles.item} onPress={toggleBottomSheet}>
                                    {isSelected ? (
                                        <FiltersSelectedIcon width={17} height={17} />
                                        ) : (
                                        <FiltersIcon width={17} height={17} />
                                    )}
                              </TouchableOpacity>
                            ) : (
                                <Item
                                    title={item.title || ""}
                                    isSelected={item.id === selectedId}
                                    onPress={() => handlePress(item.id)}
                                />
                            )
                        }
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>                                            
            </View>


            <ScrollView style={styles.contentContainer}>
                <RecommendedChannel/>
            </ScrollView>
            
            {isVisible && (
            <Animated.View
                style={[styles.bottomSheet, { transform: [{ translateY }] }]}
                {...panResponder.panHandlers}
            >
                <View style={styles.line} />
                <Text style={{ fontWeight: 500, fontSize: 16 }}>Filters</Text>
                <View style={styles.filtersContainer}>
                    <View style={styles.dropdownRow}>
                        <Text style={styles.filtersText}>
                            Upload date
                        </Text>
                        <View>
                            <FilterDropdown
                                label="Upload Date"
                                options={["Any time", "Last hour", "Today", "This week", "This month", "This year"]}
                                isOpen={openDropdown === "uploadDate"}
                                onToggle={() => toggleDropdown("uploadDate")}
                            />
                        </View>
                    </View>
                    <View style={styles.dropdownRow}>
                        <Text style={styles.filtersText}>
                            Type
                        </Text>
                        <View>
                            <FilterDropdown
                                label="Type"
                                options={["All", "Video", "Channel", "Playlist"]}
                                isOpen={openDropdown === "type"}
                                onToggle={() => toggleDropdown("type")}
                            />
                        </View>
                    </View>
                    <View style={styles.dropdownRow}>
                        <Text style={styles.filtersText}>
                            Duration
                        </Text>
                        <View>
                            <FilterDropdown
                                label="Duration"
                                options={["Over 20 minutes", "Short (<4 min)", "Medium (4-20 min)", "Long (>20 min)"]}
                                isOpen={openDropdown === "duration"}
                                onToggle={() => toggleDropdown("duration")}
                            />
                        </View>
                    </View>
                    <View style={styles.dropdownRow}>
                        <Text style={styles.filtersText}>
                            Sort by
                        </Text>
                        <View>
                            <FilterDropdown
                                label="Sort By"
                                options={["Relevance", "Upload date", "View count", "Rating"]}
                                isOpen={openDropdown === "sortBy"}
                                onToggle={() => toggleDropdown("sortBy")}
                            />
                        </View>
                    </View>
                    <View style={{ rowGap: 8 }}>
                        <Text style={styles.filtersText}>
                            Features
                        </Text>
                        <View style={styles.featuresWrapper}>                    
                            {featureLabels.map((label) => (
                                <FeatureItem
                                    key={label}
                                    label={label}
                                    isSelected={selectedFeatures.includes(label)}
                                    onSelect={() => handleSelect(label)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.filtersBtns}>
                    <View>
                        <TouchableOpacity style={[styles.filtersBtnItem, { backgroundColor: '#E6E6E6' }]}>
                            <Text style={styles.filtersBtnText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.filtersBtnItem, { backgroundColor: '#0EA2DE' }]}>
                            <Text style={[styles.filtersBtnText, { color: '#fff' }]}>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>
            )} 
        </View>
        
    )
}