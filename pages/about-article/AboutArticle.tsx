import React from 'react';

import TikTokIcon from '@/shared/icons/social-icons/TikTok.svg';
import InstagramIcon from '@/shared/icons/social-icons/Instagram.svg';
import XIcon from '@/shared/icons/social-icons/X.svg';
import DiscordIcon from '@/shared/icons/social-icons/Discord.svg';
import TelegramIcon from '@/shared/icons/social-icons/Telegram.svg';
import LinkIcon from '@/shared/icons/social-icons/Link.svg';

import EmailIcon from '@/shared/icons/channel-details-icons/Email.svg';
import WorldIcon from '@/shared/icons/channel-details-icons/World.svg';
import PeopleIcon from '@/shared/icons/channel-details-icons/People.svg';
import VideosIcon from '@/shared/icons/channel-details-icons/Videos.svg';
import ChartIcon from '@/shared/icons/channel-details-icons/Chart.svg';
import InformationIcon from '@/shared/icons/channel-details-icons/Information.svg';
import LocationIcon from '@/shared/icons/channel-details-icons/Location.svg';

import { styles } from './AboutArticleStyles';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

type LinkProps = {
    Icon: React.FC;
    name: string;
    url: string;
};

type ChannelDetailProps = {
    Icon: React.FC;
    name: string;
};

const Link: React.FC<LinkProps> = ({ Icon: Icon, name, url }) => {   
    return (        
        <View style={styles.linkContainer}>
            <View>
                <Icon />
            </View>
            <View>
                <Text style={styles.name}>{name}</Text>
                <TouchableOpacity>
                    <Text style={styles.url}>{url}</Text>
                </TouchableOpacity>
            </View>
        </View>        
    );
};

const ChannelDetail: React.FC<ChannelDetailProps> = ({ Icon: Icon, name }) => {    
    return (
        <View>
            <View style={styles.channelDetailTitleContainer}>
                <Icon />
                <Text style={styles.detailName}>{name}</Text>                
            </View>
        </View>
    );
};

export default function AboutArticle() {
    return(
        <ScrollView>
            <View style={{paddingLeft: 16, paddingBottom: 10, flexDirection: 'column', rowGap: 16}}>
                <View>
                    <Text style={styles.sectionTitle}>
                        Description
                    </Text>
                    
                    <View>
                        <Text>subscribe for more cats (and design content, of course)</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>
                        Links
                    </Text>

                    <View style={styles.linksRow}>
                        <Link Icon={TikTokIcon} name='tik tok //short tutorials' url='tiktok.com/@juxtopposed' />
                        <Link Icon={InstagramIcon} name='instagram //only for the cats' url='instagram.com/juxtopposed' />
                        <Link Icon={XIcon} name='x dot com //tweet me something' url='x.com/juxtopposed' />
                        <Link Icon={DiscordIcon} name='discord //join hospitable designers community' url='discord.gg/juxtopposed' />
                        <Link Icon={TelegramIcon} name='telegram //message me for business' url='t.me/juxtopposed' />
                        <Link Icon={LinkIcon} name='personal site //links n stuff' url='juxtopposed.com' />
                    </View>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>
                        Channel details
                    </Text>

                    <View style={styles.channelDetailsContainer}>
                        <View style={styles.channelDetailsRow}>
                            <ChannelDetail Icon={EmailIcon} name='Email'/>
                            <ChannelDetail Icon={WorldIcon} name='Channel link'/>
                            <ChannelDetail Icon={PeopleIcon} name='Follower count'/>
                            <ChannelDetail Icon={VideosIcon} name='Total videos'/>
                            <ChannelDetail Icon={ChartIcon} name='Total views'/>
                            <ChannelDetail Icon={InformationIcon} name='Joined VRoom'/>
                            <ChannelDetail Icon={LocationIcon} name='Location'/>
                        </View>

                        <View style={styles.channelDetailsRow}>
                            <Text>juxtopposed.contact@gmail.com</Text>
                            <TouchableOpacity>
                                <Text style={{color: '#295FCC'}}>https://www.vroom.tv/@juxtopposed</Text>
                            </TouchableOpacity>
                            <Text>273K</Text>
                            <Text>29</Text>
                            <Text>9,556,031</Text>
                            <Text>25 Aug 2022</Text>
                            <Text>United States</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}